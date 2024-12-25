import { RegularText, TitleText } from '../../components/Typography'
import { OrderConfirmedContainer, OrderDetailsContainer } from './styles'

import confirmedOrderIllustration from '../../assets/confirmed-order.svg'
import { InfoWithIcon } from '../../components/InfoWithIcon'

import { MapPin, Clock, CurrencyDollar, Barcode } from 'phosphor-react'
import { useTheme } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { OrderData } from '../CompleteOrder'
import { paymentMethods } from '../CompleteOrder/components/CompleteOrderForm/PaymentMethodOptions'
import { useEffect, useState } from 'react'

interface LocationType {
  state: OrderData
}

export function OrderConfirmedPage() {
  const { colors } = useTheme()

  const { state } = useLocation() as LocationType

  const navigate = useNavigate()

  const [orderCode, setOrderCode] = useState<string>('')

  useEffect(() => {
    if (!state) {
      navigate('/')
    } else {
      fetchOrderCode() // เรียกใช้ฟังก์ชันเมื่อ state ถูกกำหนดค่า
    }
  }, [])

  const fetchOrderCode = async () => {
    try {
      const response = await fetch('https://localhost:7199/Oders')
      const data = await response.json()
      // ในกรณีที่ข้อมูลมีหลายรายการ คุณต้องเลือกรายการที่ต้องการแสดง
      const order = data[data.length - 1] // เลือกรายการล่างสุด
      setOrderCode(order.code)
    } catch (error) {
      console.error('Error fetching order code:', error)
    }
  }

  if (!state) return <></>

  return (
    <OrderConfirmedContainer className="container">
      <div>
        <TitleText size="l">ยินดีด้วย! คุณได้สั่งสินค้าสำเร็จ</TitleText>
        <RegularText size="l" color="subtitle">
          โปรดรอสินค้าตอนนี้กำลังอยู่ในระหว่างพนักงานกำลังจัดเตรียมสินค้าส่ง
        </RegularText>
      </div>

      <section>
        <OrderDetailsContainer>
          <InfoWithIcon
            icon={<MapPin weight="fill" />}
            iconColor={colors['brand-purple']}
            text={
              <RegularText>
                ที่อยู่
                <strong>{state.street}</strong>
                <br />
                {state.district} - {state.city}, {state.uf}
              </RegularText>
            }
          />

          <InfoWithIcon
            icon={<Clock weight="fill" />}
            iconColor={colors['brand-yellow']}
            text={
              <RegularText>
                เวลาในการดำเนินการ
                <br />
                <strong>1 - 2 วัน</strong>
              </RegularText>
            }
          />

          <InfoWithIcon
            icon={<CurrencyDollar weight="fill" />}
            iconColor={colors['brand-yellow-dark']}
            text={
              <RegularText>
                ช่องทางการชำระ
                <br />
                <strong>{paymentMethods[state.paymentMethod].label}</strong>
              </RegularText>
            }
          />

          <InfoWithIcon
            icon={<Barcode weight="fill" />}
            iconColor={colors['brand-green']}
            text={
              <RegularText>
                รหัสเช็คสภานะสินค้า
                <br />
                <strong>{orderCode}</strong>
              </RegularText>
            }
          />
        </OrderDetailsContainer>

        <img src={confirmedOrderIllustration} alt="" />
      </section>
    </OrderConfirmedContainer>
  )
}
