export function IconChevronLeft(props: { color?: string; size?: string }) {
  const size = props.size ?? '24'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
        fill={props.color || 'var(--surface-surface-1)'}
      />
    </svg>
  )
}

export default IconChevronLeft
