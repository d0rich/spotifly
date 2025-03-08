<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchInput, {
  type SearchInputModel
} from './components/SearchInput.vue'
import ItemCard, { type Item } from './components/ItemCard.vue'

const searchQuery = ref<SearchInputModel>({
  q: '',
  type: ['show'],
  market: null
})

const { data, execute, status } = useFetch('/api/search', {
  method: 'POST',
  body: searchQuery
})

const items = computed(() => {
  const allItems = []
  const results = data.value
  for (const key in results) {
    allItems.push(...(results[key as keyof typeof results]?.items ?? []))
  }
  return allItems
})
</script>

<template>
  <div class="container mx-auto">
    <SearchInput v-model="searchQuery" @search="execute" />
    <div class="mx-auto max-w-5xl">
      <ItemCard class="m-4" v-for="item in items" :item="item" :key="item.id" />
    </div>
  </div>
</template>
