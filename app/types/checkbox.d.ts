export interface CheckboxProps {
  label?: string
  disabled?: boolean
  name?: string
  value?: string | number | boolean
}

export interface CheckboxEmits {
  change: [checked: boolean]
}
