<script setup lang="ts">
import { computed } from 'vue'
import { useQueryControls } from './composables/useQueryControls'
import SearchInput from './components/SearchInput.vue'
import ItemCard from './components/ItemCard.vue'
import AlertInfo from './components/AlertInfo.vue'
import AlertError from './components/AlertError.vue'
import AlertWarning from './components/AlertWarning.vue'

const { searchQuery } = useQueryControls()

const { data, execute, status, error } = useAsyncData(
  () =>
    $fetch('/api/search', {
      method: 'POST',
      body: searchQuery.value
    }),
  {
    immediate: false
  }
)

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
      </div>
    </div>
  </div>
</template>
