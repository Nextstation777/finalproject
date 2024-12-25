import {
  HeroContainer,
  HeroContent,
  HeroTitle,
  BenefitsContainer,
} from './styles'

import logoImage from '../../../../assets/logo.png'
import { RegularText } from '../../../../components/Typography'
import { InfoWithIcon } from '../../../../components/InfoWithIcon'
import { ShoppingCart, Package, Timer, Coffee, Money } from 'phosphor-react'
import { useTheme } from 'styled-components'

export function Hero() {
  const { colors } = useTheme()

  return (
    <HeroContainer>
      <HeroContent className="container">
        <div>
          <section>
            <HeroTitle size="xl">
              สินค้าไม้สักออนไลน์
            </HeroTitle>
            <RegularText size="l" color="subtitle" as="h3">
              สินค้าทุกชนิดไม้สักแท้ 100% ได้มาตราฐาน ทนทาน สวยงาม
            </RegularText>
          </section>

          <BenefitsContainer>
            <InfoWithIcon
              iconColor={colors['brand-yellow-dark']}
              icon={<ShoppingCart weight="fill" />}
              text="ซื้อง่าย ไม่ต้องสมัครสมาชิก"
            />
            <InfoWithIcon
              iconColor={colors['base-text']}
              icon={<Package weight="fill" />}
              text="สินค้าคุณภาพดี"
            />
            <InfoWithIcon
              iconColor={colors['brand-yellow']}
              icon={<Timer weight="fill" />}
              text="จัดส่งสินค้ารวดเร็ว"
            />
            <InfoWithIcon
              iconColor={colors['brand-green']}
              icon={<Money weight="fill" />}
              text="สินค้าถูก ประหยัดเงิน"
            />
          </BenefitsContainer>
        </div>

        <div className="imageContainer">
          <img src={logoImage} alt="" />
        </div>
      </HeroContent>
    </HeroContainer>
  )
}
