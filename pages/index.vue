<!-- pages/index.vue -->
<template>
    <div class="container">
     <HeaderView />
     <h3 style="margin-top: 15px">Most Streamed Spotify Songs 2023</h3>
       <p>
        This dataset contains a comprehensive list of the most famous songs of 2023 as listed on Spotify. The dataset offers a wealth of features beyond what is typically available in similar datasets. It provides insights into each song's attributes, popularity, and presence on various music platforms. The dataset includes information such as track name, artist(s) name, release date and  Spotify playlists, charts and various audio features.
       </p>
     <ul>
       <li v-for="song in songs" :key="song.slug">
         <NuxtLink :to="{ name: 'songs-slug', params: { slug: song.slug } }">{{song.track_name}}</NuxtLink>
       </li>
     </ul>
     <FooterView />
   </div>
  </template>
  <script>
	import { mapState } from 'vuex'

	export default {
	  async fetch({ params, store: { dispatch, getters } }) {
	    await dispatch('getSongs')
	  },
	  computed: {
	    ...mapState({
	      songs: (state) => state.songs.data,
	    })
	  }
	}
</script>