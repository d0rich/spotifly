import {
  SpotifyApi,
  type ItemTypes,
  type Market,
  type MaxInt
} from '@spotify/web-api-ts-sdk'

export type ProxySearchQuery = {
  q: string
  type: ItemTypes[]
  market?: Market
  limit?: MaxInt<50>
  offset?: number
}

const spotify = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID || '',
  process.env.SPOTIFY_CLIENT_SECRET || ''
)

export default defineEventHandler(async (event) => {
  await spotify.authenticate()
  const body = await readBody<ProxySearchQuery>(event)
  return spotify.search(body.q, body.type, body.market, body.limit, body.offset)
})
