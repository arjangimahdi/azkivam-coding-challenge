export interface CheckboxProps {
  label?: string
  disabled?: boolean
  name?: string
}

export interface CheckboxEmits {
  change: [checked: boolean]
}
