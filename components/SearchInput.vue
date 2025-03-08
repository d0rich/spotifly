<script setup lang="ts">
import type { ItemTypes, Market } from '@spotify/web-api-ts-sdk'
import * as countryCodes from 'country-codes-list'
import { ref, watch } from 'vue'

export type SearchInputModel = {
  q: string
  type: ItemTypes[]
  market: Market | null
}

const model = defineModel<SearchInputModel>({
  default: {
    q: '',
    type: [],
    market: null
  }
})

const countries: Record<Market, string> = countryCodes.customList(
  'countryCode',
  '{countryNameEn}'
)
const typesToPick: Record<ItemTypes, string> = {
  show: 'Podcast',
  episode: 'Episode',
  artist: 'Artist',
  album: 'Album',
  playlist: 'Playlist',
  track: 'Track',
  audiobook: 'Audiobook'
}

const pickedType = ref<ItemTypes | ''>('show')
const pickedCountry = ref<string>('')
const emit = defineEmits({
  search: (model: SearchInputModel) => Promise<void>
})

watch(pickedType, (value) => {
  if (value === '') {
    model.value.type = []
    return
  }
  model.value.type = [value]
})

watch(pickedCountry, (value) => {
  if (countries[value as Market] === undefined) {
    model.value.market = null
    return
  }
  model.value.market = value as Market
})
</script>

<template>
  <div class="flex flex-col items-center px-4">
    <div class="filter my-4">
      <input
        class="btn btn-sm btn-primary filter-reset"
        type="radio"
        name="contenttypes"
        value=""
        v-model="pickedType"
        aria-label="All"
      />
      <input
        v-for="(label, value) in typesToPick"
        class="btn btn-sm btn-primary"
        type="radio"
        name="contenttypes"
        :value="value"
        v-model="pickedType"
        :aria-label="label"
      />
    </div>
    <form class="join" @submit.prevent="emit('search', model)">
      <input
        type="text"
        v-model="pickedCountry"
        placeholder="Country Code"
        class="input join-item max-w-32"
        list="countries"
      />
      <input
        type="text"
        v-model="model.q"
        placeholder="Search"
        class="input join-item"
      />
      <button class="btn btn-primary join-item" type="submit">Search</button>
    </form>
    <datalist id="countries">
      <option
        v-for="(country, code) in countries"
        :value="code"
        :label="country"
      />
    </datalist>
  </div>
</template>
