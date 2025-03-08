<script setup lang="ts">
import { computed, ref } from 'vue'
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

const isDescriptionOpened = ref(false)

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

const description = computed(() => {
  if ('description' in props.item) {
    return props.item.description
  }
  return ''
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
  <div
    class="grid grid-cols-[8rem_1fr] gap-4 bg-base-200 shadow-md rounded-xl p-4"
  >
    <img class="rounded-xl" :src="image" alt="Cover" />
    <div class="flex flex-col justify-between">
      <h2 class="card-title">
        {{ title }} <kbd class="kbd kbd-md">{{ type }}</kbd>
      </h2>
      <div>
        <a :href="url" target="_blank" class="btn btn-primary">Listen</a>
      </div>
    </div>
    <div v-if="description" class="item-card__description">
      <div class="collapse bg-base-300 border-base-300 border">
        <input type="checkbox" v-model="isDescriptionOpened" />
        <div class="collapse-title">
          <div class="line-clamp-1">
            <template v-if="isDescriptionOpened">Description</template>
            <template v-else>
              {{ description }}
            </template>
          </div>
        </div>
        <div class="collapse-content text-sm" v-html="descriptionHtml" />
      </div>
    </div>
  </div>
</template>

<style>
.item-card__description {
  grid-column: span 2;
}
</style>
