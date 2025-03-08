import { ref, computed } from 'vue'
import type { ItemTypes, Market } from '@spotify/web-api-ts-sdk'
import { useCountries } from './useCountries'

export type SearchInputModel = {
  q: string
  type: ItemTypes[]
  market: Market | null
}

const searchQuery = ref<SearchInputModel>({
  q: '',
  type: ['show'],
  market: null
})

const isValid = computed(() => {
  const countries = useCountries()
  if (searchQuery.value.q.trim().length === 0) {
    return false
  }
  if (searchQuery.value.type.length === 0) {
    return false
  }
  if (searchQuery.value.market && !(searchQuery.value.market in countries)) {
    return false
  }
  return true
})

export function useQueryControls() {
  return {
    searchQuery,
    isValid
  }
}
