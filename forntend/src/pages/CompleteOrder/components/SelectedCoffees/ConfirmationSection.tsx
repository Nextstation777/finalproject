import React, { useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { RegularText } from '../../../../components/Typography';
import { useCart } from '../../../../hooks/useCart';
import { formatMoney } from '../../../../utils/formatMoney';
import { ConfirmationSectionContainer } from './styles';

interface ConfirmationSectionProps {
  setFormattedCartTotal: React.Dispatch<React.SetStateAction<string>>;
}

const DELIVERY_PRICE = 150;

export const ConfirmationSection: React.FC<ConfirmationSectionProps> = ({ setFormattedCartTotal }) => {
  const { cartItemsTotal, cartQuantity } = useCart();
  const cartTotal = DELIVERY_PRICE + cartItemsTotal;

  const formattedItemsTotal = formatMoney(cartItemsTotal);
  const formattedDeliveryPrice = formatMoney(DELIVERY_PRICE);
  const formattedCartTotal = formatMoney(cartTotal);

  useEffect(() => {
    // เมื่อคำนวณค่า formattedCartTotal เสร็จสิ้น ให้เรียกใช้ setFormattedCartTotal เพื่อเก็บค่าไว้ใน state
    setFormattedCartTotal(formattedCartTotal);
  }, [formattedCartTotal, setFormattedCartTotal]);

  return (
    <ConfirmationSectionContainer>
      <div>
        <RegularText size="s">ค่าสินค้า</RegularText>
        <RegularText size="s">{formattedItemsTotal} บาท</RegularText>
      </div>
      <div>
        <RegularText size="s">ค่าจัดส่ง</RegularText>
        <RegularText size="s">{formattedDeliveryPrice} บาท</RegularText>
      </div>
      <div>
        <RegularText weight="700" color="subtitle" size="l">
          ราคาสินค้ารวม
        </RegularText>
        <RegularText weight="700" color="subtitle" size="l">
          {formattedCartTotal} บาท
        </RegularText>
      </div>

      <Button
        text="ชำระสินค้า"
        disabled={cartQuantity <= 0}
        type="submit"
      />
    </ConfirmationSectionContainer>
  );
}
