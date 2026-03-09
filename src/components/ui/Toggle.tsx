interface ToggleProps {
  enabled: boolean
  onChange: (val: boolean) => void
  disabled?: boolean
}

export default function Toggle({ enabled, onChange, disabled }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        enabled ? 'bg-white' : 'bg-surface-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full transition-transform duration-200 ${
          enabled ? 'translate-x-6 bg-black' : 'translate-x-1 bg-surface-400'
        }`}
      />
    </button>
  )
}
