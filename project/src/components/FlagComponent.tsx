import { getCountryCode } from '@/api/alpha2'
import { Image } from '@kuma-ui/core'

export function FlagComponent(props: { countryName: string }) {
  const countryCode = getCountryCode(props.countryName)
  if (!countryCode) {
    return <></>
  }
  return (
    <Image src={`https://www.sofascore.com/static/images/flags/${countryCode}.png`} height={`16px`} aspectRatio={1} />
  )
}
