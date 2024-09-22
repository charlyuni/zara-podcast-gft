interface InputProps {
  id: string
  label?: string
  type?: 'text' | 'number' | 'email'
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  errorMessage?: string
}

const Input = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  errorMessage,
}: InputProps) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 rounded w-full"
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default Input
