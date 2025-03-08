<script setup lang="ts">
import { spotify } from '../services/spotify'

async function printToken() {
  console.log(await spotify.getAccessToken())
}
</script>
<template>
  <div>
    <button @click="spotify.authenticate()" class="btn btn-primary">
      Spotify Login
    </button>
    <button @click="spotify.logOut()" class="btn btn-danger">Logout</button>
    <button @click="printToken" class="btn btn-danger">Token</button>
  </div>
</template>
