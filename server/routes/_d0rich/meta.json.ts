export default defineEventHandler(() => {
  return {
    title: 'Spotifly',
    description:
      'Search content on Spotify like you are in a different country.',
    last_updated: new Date().toISOString(),
    url: 'https://spotifly.d0rich.me',
    image: 'https://spotifly.d0rich.me/og/image.jpg',
    complexity: 2,
    tags: ['spotify', 'search', 'front-end']
  }
})
