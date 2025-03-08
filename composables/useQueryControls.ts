import { ref, computed, watch, reactive } from 'vue'
import type { ItemTypes, Market } from '@spotify/web-api-ts-sdk'
import { useCountries } from './useCountries'

export type SearchInputModel = {
  q: string
  type: ItemTypes[]
  market: Market | null
}

const searchQuery = reactive<SearchInputModel>({
  q: '',
  type: ['show'],
  market: null
})

const cachedMarket = ref<Market | null>(searchQuery.market)

watch(searchQuery, (newQuery) => {
  const countries = useCountries()
  if (newQuery.market && !(newQuery.market in countries)) {
    // don't cache invalid market
    return
  }
  if (newQuery.market !== cachedMarket.value && localStorage) {
    cachedMarket.value = newQuery.market
    localStorage.setItem('market', newQuery.market || '')
  }
})

const isValid = computed(() => {
  const countries = useCountries()
  if (searchQuery.q.trim().length === 0) {
    return false
  }
  if (searchQuery.type.length === 0) {
    return false
  }
  if (searchQuery.market && !(searchQuery.market in countries)) {
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
