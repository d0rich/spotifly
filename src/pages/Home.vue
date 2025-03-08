<script setup lang="ts">
import { ref } from 'vue'
import { spotify } from '../services/spotify'
import SpotifyAuth from '../components/SpotifyAuth.vue'
import SearchInput, {
  type SearchInputModel
} from '../components/SearchInput.vue'
import ItemCard, { type Item } from '../components/ItemCard.vue'

const searchQuery = ref<SearchInputModel>({
  q: '',
  type: ['show'],
  market: null
})

const items = ref<Item[]>([])

async function search() {
  const results = await spotify.search(
    searchQuery.value.q,
    searchQuery.value.type,
    searchQuery.value.market ?? undefined
  )
  const allItems = []
  for (const key in results) {
    allItems.push(...(results[key as keyof typeof results]?.items ?? []))
  }
  items.value = allItems
}
</script>

<template>
  <SpotifyAuth />
  <SearchInput v-model="searchQuery" />
  <button @click="search" class="btn btn-primary">Search</button>
  <div class="mx-auto max-w-5xl">
    <ItemCard class="m-4" v-for="item in items" :item="item" :key="item.id" />
  </div>
</template>
