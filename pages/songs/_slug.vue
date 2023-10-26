<!-- pages/song/[...slug].vue -->
<script>
import { mapState } from 'vuex'

export default {
  async fetch({ i18n, context, params, store, store: { dispatch, getters } }) {
    await dispatch('getSong', params)
    await dispatch('getReadMore', {
          slug: params.slug,
          tags: Object.keys(store.state.songs.data)
   })
   await dispatch('getPrevNext', params)
  },
  computed: {
    ...mapState({
      song: (state) => state.song.data,
      readMore: (state) => state.readMore.data,
      prevNext: (state) => state.prevNext.data,
    })
  }
}
</script>

<template>
    <div class="container">
      <HeaderView />
      <div class="row">
        <div class="three columns">
        </div>
        <div class="six columns">
          <h4>{{song.track_name}}</h4>
           <b>by</b> {{song.artist_name}}<br /><br />
           <b>Lanch:</b> {{song.lanch}}<br />
           <b>In playlists:</b> {{song.in_spotify_playlists}}<br />
           <b>In_spotify_charts:</b> {{song.in_spotify_charts}}<br />
           <b>Streams:</b> {{song.streams}}<br />
           <b>Danceability:</b> {{song.danceability}} %<br />
           <b>Valence:</b> {{song.valence}} %<br />
           <b>Energy:</b> {{song.energy}} %<br />
           <b>Acousticness:</b> {{song.acousticness}} %<br />
           <b>Instrumentalness:</b> {{song.instrumentalness}} %<br />
           <b>Liveness:</b> {{song.liveness}} %<br />
           <b>Speechiness:</b> {{song.speechiness}} %<br />
          </div>
          <utteranc/>
          <div class="two columns"></div>
      </div>
      <FooterView />
    </div>
  </template>