<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import type { Market } from '@spotify/web-api-ts-sdk'
import { useQueryControls } from './composables/useQueryControls'
import { usePagination } from './composables/usePagination'
import SearchInput from './components/SearchInput.vue'
import ItemCard from './components/ItemCard.vue'
import AlertInfo from './components/AlertInfo.vue'
import AlertError from './components/AlertError.vue'
import AlertWarning from './components/AlertWarning.vue'
import MetaTags from './components/MetaTags.vue'
import Pagination from './components/Pagination.vue'

const { searchQuery } = useQueryControls()
const { afterFetch, queryPage, paginationQuery } = usePagination()

const currentQuery = ref(JSON.stringify(searchQuery))

const { data, execute, status, error } = useAsyncData(
  () => {
    if (JSON.stringify(searchQuery) !== currentQuery.value) {
      queryPage(1)
      currentQuery.value = JSON.stringify(searchQuery)
    }
    return $fetch('/api/search', {
      method: 'POST',
      body: {
        ...searchQuery,
        ...paginationQuery
      }
    })
  },
  {
    immediate: false
  }
)

onBeforeMount(() => {
  searchQuery.market = (localStorage.getItem('market') as Market) || null
})

const changePage = (page: number) => {
  queryPage(page)
  execute()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const items = computed(() => {
  const results = data.value
  for (const key in results) {
    const currentType = results[key as keyof typeof results]
    if (currentType) {
      afterFetch(currentType)
      return currentType.items
    }
  }
  return []
})
</script>

<template>
  <MetaTags />
  <div class="container mx-auto">
    <SearchInput @search="execute" />
    <div class="mx-auto px-4 mt-10 max-w-5xl">
      <AlertInfo v-if="status === 'idle' || status === 'pending'">
        <span v-if="status === 'idle'">Enter a search query.</span>
        <span v-else>
          <span class="loading loading-ring loading-md" /> Loading...
        </span>
      </AlertInfo>
      <AlertError v-else-if="error">
        <span>Error: something wrong happened on our side ({{ error }})</span>
      </AlertError>
      <AlertWarning v-else-if="status === 'success' && items.length === 0">
        <span>No results</span>
      </AlertWarning>
      <div v-else>
        <ItemCard
          class="my-4"
          v-for="item in items"
          :item="item"
          :key="item.id"
        />
        <div class="flex justify-center">
          <Pagination class="my-10" @navigate="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>
