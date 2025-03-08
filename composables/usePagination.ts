import { ref, computed } from 'vue'
import type { MaxInt } from '@spotify/web-api-ts-sdk'

const totalItems = ref(0)
const currentPage = ref(1)
const itemsPerPage = ref<MaxInt<50>>(20)

export type PaginationData = {
  limit: MaxInt<50>
  offset: number
}

interface PaginationResponse {
  total: number
  offset: number
}

const paginationQuery = reactive<PaginationData>({
  limit: itemsPerPage.value,
  offset: 0
})

function afterFetch({ total, offset }: PaginationResponse) {
  totalItems.value = total
  currentPage.value = Math.floor(offset / itemsPerPage.value) + 1
}

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value)
})

function queryPage(page: number) {
  paginationQuery.offset = (page - 1) * paginationQuery.limit
}

export function usePagination() {
  return {
    paginationQuery,
    afterFetch,
    totalPages,
    queryPage,
    currentPage
  }
}
