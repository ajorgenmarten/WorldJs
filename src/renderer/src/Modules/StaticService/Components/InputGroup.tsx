export default function InputGroup(props: InputGroupProps) {
  const { label, className, ...inputProps } = props
  return (
    <div className={className}>
      <label
        htmlFor="port"
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <input
        {...inputProps}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
      />
    </div>
  )
}

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}
