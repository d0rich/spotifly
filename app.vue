<script setup lang="ts">
import { computed } from 'vue'
import { useQueryControls } from './composables/useQueryControls'
import SearchInput from './components/SearchInput.vue'
import ItemCard from './components/ItemCard.vue'

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
      <div
        v-if="status === 'idle' || status === 'pending'"
        role="alert"
        class="alert alert-info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span v-if="status === 'idle'">Enter a search query.</span>
        <span v-else
          ><span class="loading loading-ring loading-md"></span>Loading...</span
        >
      </div>
      <div v-else-if="error" role="alert" class="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error: something wrong happened on our side ({{ error }})</span>
      </div>
      <div
        v-else-if="status === 'success' && items.length === 0"
        role="alert"
        class="alert alert-warning"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>No results</span>
      </div>
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
