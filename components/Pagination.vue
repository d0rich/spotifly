<script setup lang="ts">
import { usePagination } from '~/composables/usePagination'

const { currentPage, totalPages } = usePagination()
const emit = defineEmits({
  navigate: (page: number) => true
})
</script>

<template>
  <div v-if="totalPages > 1" class="join">
    <button
      v-if="currentPage > 1"
      @click="emit('navigate', currentPage - 1)"
      class="join-item btn btn-md btn-accent"
    >
      Previous
    </button>
    <div class="join-item btn btn-md">Page {{ currentPage }}</div>
    <button
      v-if="currentPage < totalPages"
      @click="emit('navigate', currentPage + 1)"
      class="join-item btn btn-md btn-accent"
    >
      Next
    </button>
  </div>
</template>
