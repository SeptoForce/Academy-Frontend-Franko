export function IconPenaltyMissed(props: { color?: string; size?: string }) {
  const size = props.size ?? '24'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 3H2v9h2V5h16v7h2V3H4zm11.536 17.95L12 17.414 8.464 20.95 7.05 19.535 10.586 16 7.05 12.464l1.414-1.414L12 14.586l3.536-3.536 1.414 1.414L13.414 16l3.536 3.535-1.414 1.415z"
        fill="#1DA86D"
      />
    </svg>
  )
}

export default IconPenaltyMissed
