<script setup lang="ts">
import { joinURL } from 'ufo'

const title = 'Spotifly'
const ogTitle = 'Spotifly'
const description =
  'Search content on Spotify like you are in a different country.'
const imageHref = joinURL('https://spotifly.d0rich.me', 'og', 'image.jpg')

useScriptCloudflareWebAnalytics({
  token: '88d63ae6f6224757a3f40d6cad07cb2d'
})
</script>

<template>
  <Head>
    <Title>
      {{ title }}
    </Title>
    <Meta property="og:title" :content="ogTitle || title" />
    <Meta property="twitter:title" :content="title" />

    <Meta name="description" :content="description" />
    <Meta property="og:description" :content="description" />
    <Meta property="twitter:description" :content="description" />

    <Meta property="og:image" :content="imageHref" />
    <Meta property="twitter:image" :content="imageHref" />
    <Meta property="tg:cover" :content="imageHref" />

    <Link rel="author" href="https://d0rich.me" />
    <Meta property="tg:channel" content="@d0rich" />
  </Head>
</template>
