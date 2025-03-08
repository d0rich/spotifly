<script setup lang="ts">
import type { ItemTypes, Market } from '@spotify/web-api-ts-sdk'
import { ref, watch } from 'vue'
import { useQueryControls } from '../composables/useQueryControls'
import { useCountries } from '~/composables/useCountries'

const { searchQuery: model, isValid } = useQueryControls()

const countries = useCountries()
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
const emit = defineEmits(['search'])

watch(pickedType, (value) => {
  if (value === '') {
    model.value.type = []
    return
  }
  model.value.type = [value]
})

watch(pickedCountry, (value) => {
  model.value.market = (value as Market) || null
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
    <div v-if="!pickedType" role="alert" class="alert mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info h-6 w-6 shrink-0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>It is required to choose a type of content.</span>
    </div>
    <form class="join" @submit.prevent="emit('search')">
      <div>
        <input
          type="text"
          v-model="pickedCountry"
          placeholder="Country Code"
          class="input join-item max-w-32 validator"
          list="countries"
          pattern="[A-Z]{2}"
        />
        <div class="validator-hint max-w-32 hidden">
          2-character country code or empty value should be provided
        </div>
      </div>
      <div>
        <input
          type="text"
          v-model="model.q"
          required
          pattern=".*\S+.*"
          placeholder="Search"
          class="input validator join-item"
        />
        <div class="validator-hint hidden">Search query is required</div>
      </div>
      <button
        :disabled="!isValid"
        class="btn btn-primary join-item"
        type="submit"
      >
        Search
      </button>
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
