import * as InputPrimitive from '@natural-forms/input'

type InputProps = {
  label: string
} & React.ComponentProps<typeof InputPrimitive.Input>

const Input = ({ label, ...props }: InputProps) => (
  <InputPrimitive.Root>
    <InputPrimitive.Label>{label}</InputPrimitive.Label>
    <InputPrimitive.Input {...props} />
    <InputPrimitive.Error />
  </InputPrimitive.Root>
)

export default Input
