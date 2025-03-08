<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <main class="container max-w-5xl mx-auto my-4">
      <component :is="Component" />
    </main>
  </RouterView>
</template>
