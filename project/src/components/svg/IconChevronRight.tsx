export function IconChevronRight(props: { color?: string; size?: string }) {
  const size = props.size ?? '24'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
        fill={props.color || 'var(--surface-surface-1)'}
      />
    </svg>
  )
}

export default IconChevronRight
