export function IconPointerDown(props: { color?: string; size?: string }) {
  const size = props.size ?? '24'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m7 10 5 5 5-5H7z" fill={props.color || 'var(--surface-surface-1)'} />
    </svg>
  )
}

export default IconPointerDown
