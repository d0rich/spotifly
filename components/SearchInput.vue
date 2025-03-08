<script setup lang="ts">
import type { ItemTypes } from '@spotify/web-api-ts-sdk'
import { useQueryControls } from '../composables/useQueryControls'
import { useCountries } from '~/composables/useCountries'

const { searchQuery: model, isValid } = useQueryControls()

const countries = useCountries()

const typesToPick: Record<string, ItemTypes[]> = {
  Podcast: ['show'],
  Episode: ['episode'],
  Artist: ['artist'],
  Album: ['album'],
  Playlist: ['playlist'],
  Track: ['track'],
  Audiobook: ['audiobook']
}

const emit = defineEmits(['search'])
</script>

<template>
  <div class="flex flex-col items-center px-4">
    <div class="filter my-4">
      <input
        class="btn btn-sm btn-primary filter-reset"
        type="radio"
        name="contenttypes"
        :value="[]"
        v-model="model.type"
        aria-label="All"
      />
      <input
        v-for="(value, label) in typesToPick"
        class="btn btn-sm btn-primary"
        type="radio"
        name="contenttypes"
        :value="value"
        v-model="model.type"
        :aria-label="label"
      />
    </div>
    <div v-if="!model.type.length" role="alert" class="alert mb-4">
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
          v-model="model.market"
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
