export interface SearchInputProps {
  placeholder?: string
  trailingIcon?: string
  debounceMs?: number
}

export interface SearchInputEmits {
  change: [value: string]
}
