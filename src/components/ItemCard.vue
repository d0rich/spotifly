<script setup lang="ts">
import { computed } from 'vue'
import type {
  Artist,
  SimplifiedAlbum,
  SimplifiedShow,
  SimplifiedEpisode,
  SimplifiedPlaylist,
  Track,
  SimplifiedAudiobook
} from '@spotify/web-api-ts-sdk'

export type Item =
  | Artist
  | SimplifiedAlbum
  | SimplifiedShow
  | SimplifiedEpisode
  | Omit<SimplifiedPlaylist, 'tracks'>
  | Track
  | SimplifiedAudiobook

const props = defineProps<{
  item: Item
}>()

const image = computed(() => {
  if ('album' in props.item) {
    return props.item.album.images[0].url
  }
  return props.item.images[0].url
})

const type = computed(() => {
  return props.item.type
})

const title = computed(() => {
  return props.item.name
})

const descriptionHtml = computed(() => {
  if ('html_description' in props.item) {
    return props.item.html_description
  }
  return ''
})

const url = computed(() => {
  return props.item.external_urls.spotify
})
</script>

<template>
  <div class="card card-side bg-base-300 shadow-sm max-h-64">
    <figure>
      <img :src="image" alt="Cover" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ title }} <kbd class="kbd kbd-md">{{ type }}</kbd>
      </h2>
      <p v-html="descriptionHtml"></p>
      <div class="card-actions justify-end">
        <a :href="url" target="_blank" class="btn btn-primary">Listen</a>
      </div>
    </div>
  </div>
</template>
