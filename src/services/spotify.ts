import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { joinURL } from 'ufo'

console.log(joinURL(window.location.origin, 'auth', 'callback'))

export const spotify = SpotifyApi.withUserAuthorization(
  'b79eeb8f043043b6887c700dcf086e85',
  joinURL(window.location.origin, 'auth', 'callback'),
  ['user-read-email']
)
