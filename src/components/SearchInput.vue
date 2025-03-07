<script setup lang="ts">
import type { ItemTypes, Market } from '@spotify/web-api-ts-sdk'
import * as countryCodes from 'country-codes-list'
import { ref, watch } from 'vue'

const model = defineModel<{
  q: string
  type: ItemTypes[]
  market: Market | null
}>({
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
  <input type="text" v-model="model.q" placeholder="Search" class="input" />
  <div class="filter">
    <input
      class="btn btn-sm btn-secondary filter-reset"
      type="radio"
      name="contenttypes"
      value=""
      v-model="pickedType"
      aria-label="All"
    />
    <input
      v-for="(value, label) in typesToPick"
      class="btn btn-sm btn-secondary"
      type="radio"
      name="contenttypes"
      :value="value"
      v-model="pickedType"
      :aria-label="label"
    />
  </div>
  <input
    type="text"
    v-model="pickedCountry"
    placeholder="Country Code"
    class="input"
    list="countries"
  />
  <datalist id="countries">
    <option
      v-for="(country, code) in countries"
      :value="code"
      :label="country"
    />
  </datalist>
</template>
