import { AddressFormContainer } from './styles'
import { useFormContext } from 'react-hook-form'
import { Input } from '../../../../components/Input'

interface ErrorsType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export function AddressForm() {
  const { register, formState } = useFormContext()

  const { errors } = formState as unknown as ErrorsType

  return (
    <AddressFormContainer>
      <div className="row">
        <Input
          placeholder="รหัสไปรษณีย์"
          type="number"
          className="cep"
          {...register('cep')}
          error={errors.cep?.message}
        />
      </div>
      <div className="row">
        <Input
          placeholder="เลขที่/อาคาร/หมู่บ้าน"
          className="street"
          {...register('street')}
          error={errors.street?.message}
        />
      </div>
      <div className="row">
        <Input
          placeholder="อำเภอ"
          {...register('district')}
          error={errors.district?.message}
        />
        <Input
          placeholder="จังหวัด"
          className="city"
          {...register('city')}
          error={errors.city?.message}
        />
        <Input
          placeholder="ตำบล"
          className="city"
          {...register('uf')}
          error={errors.uf?.message}
        />
      </div>
    </AddressFormContainer>
  )
}
