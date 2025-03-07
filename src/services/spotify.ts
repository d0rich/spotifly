import { SpotifyApi } from '@spotify/web-api-ts-sdk'

export const spotify = SpotifyApi.withUserAuthorization(
  'b79eeb8f043043b6887c700dcf086e85',
  window.location.origin,
  ['user-read-email']
)
