<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { spotify } from '../services/spotify'

const router = useRouter()

onBeforeMount(async () => {
  await spotify.authenticate()
  router.push({ name: 'home' })
})
</script>

<template>
  <div>
    <h1>Authenticating...</h1>
  </div>
</template>
