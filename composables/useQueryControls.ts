import { ref } from 'vue'
import type { ItemTypes, Market } from '@spotify/web-api-ts-sdk'

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

export function useQueryControls() {
  return {
    searchQuery
  }
}
