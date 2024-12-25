import React from 'react';
import { TitleText } from '../../../../components/Typography'
import { useCart } from '../../../../hooks/useCart'
import { CoffeeCartCard } from '../CoffeeCartCard'
import { ConfirmationSection } from './ConfirmationSection'
import { DetailsContainer, SelectedCoffeesContainer } from './styles'

interface SelectedCoffeesProps {
  setFormattedCartTotal: React.Dispatch<React.SetStateAction<string>>;
}

export function SelectedCoffees({ setFormattedCartTotal }: SelectedCoffeesProps) {
  const { cartItems } = useCart()

  return (
    <SelectedCoffeesContainer>
      <TitleText size="xs" color="subtitle">
        ยอดสั่งซื้อสินค้า
      </TitleText>

      <DetailsContainer>
        {cartItems.map((item) => (
          <CoffeeCartCard key={item.id} coffee={item} />
        ))}

        {/* ส่ง prop setFormattedCartTotal ไปยัง ConfirmationSection */}
        <ConfirmationSection setFormattedCartTotal={setFormattedCartTotal} />
      </DetailsContainer>
    </SelectedCoffeesContainer>
  )
}
