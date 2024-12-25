import React, { useState } from 'react';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

import { CompleteOrderForm } from './components/CompleteOrderForm';
import { SelectedCoffees } from './components/SelectedCoffees';
import { CompleteOrderContainer } from './styles';

enum PaymentMethods {
  credit = 'credit',
  debit = 'debit',
  money = 'money',
}

const confirmOrderFormValidationSchema = zod.object({
  cep: zod.string().min(1, 'Informe o CEP'),
  street: zod.string().min(1, 'Informe o Rua'),
  district: zod.string().min(1, 'Informe o Bairro'),
  city: zod.string().min(1, 'Informe a Cidade'),
  uf: zod.string().min(1, 'Informe a UF'),
  paymentMethod: zod.nativeEnum(PaymentMethods, {
    errorMap: () => {
      return { message: 'Informe o método de pagamento' }
    },
  }),
})

export type OrderData = zod.infer<typeof confirmOrderFormValidationSchema>;

type ConfirmOrderFormData = OrderData;

export function CompleteOrderPage() {
  const confirmOrderForm = useForm<ConfirmOrderFormData>({
    resolver: zodResolver(confirmOrderFormValidationSchema),
    defaultValues: {
      paymentMethod: undefined,
    },
  });

  const { handleSubmit } = confirmOrderForm;
  const navigate = useNavigate();
  const { cleanCart, cartItems } = useCart(); // เรียกใช้ cartItems จาก useCart

  // สร้าง state เพื่อเก็บค่า formattedCartTotal
  const [formattedCartTotal, setFormattedCartTotal] = useState<string>("");

  const handleConfirmOrder = async (data: ConfirmOrderFormData) => {
    try {
      // แปลงรายการสินค้าให้เป็นรูปแบบที่ API ต้องการ
      const products = cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
      }));
  
      // แปลง formattedCartTotal จาก string เป็น number
      const cartTotal = parseInt(formattedCartTotal.replace(/,/g, ''), 10);
  
      const response = await axios.post('https://localhost:7199/Oder', { 
        ...data, 
        products,
        formattedCartTotal: cartTotal // ส่ง cartTotal ที่แปลงแล้วแทน
      }); 
      console.log(response.data); // แสดงข้อมูลที่ได้รับจาก API
      navigate('/orderConfirmed', {
        state: data,
      });
      cleanCart();
    } catch (error) {
      console.error('Error:', error); // แสดงข้อผิดพลาดที่เกิดขึ้น
    }
  };

  return (
    <FormProvider {...confirmOrderForm}>
      <CompleteOrderContainer
        className="container"
        onSubmit={handleSubmit(handleConfirmOrder)}
      >
        <CompleteOrderForm />
        {/* ส่ง formattedCartTotal เข้าไปใน SelectedCoffees และรับค่าที่ได้กลับมาเพื่อเก็บไว้ใน state */}
        <SelectedCoffees setFormattedCartTotal={setFormattedCartTotal} />
      </CompleteOrderContainer>
    </FormProvider>
  );
}
