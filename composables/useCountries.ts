import type { Market } from '@spotify/web-api-ts-sdk'
import * as countryCodes from 'country-codes-list'

const countries: Record<Market, string> = countryCodes.customList(
  'countryCode',
  '{countryNameEn}'
)

export function useCountries() {
  return countries
}
