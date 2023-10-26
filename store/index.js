import STATUS_TYPES from './config/statusTypes'
import { parsesJSON } from './utils'

const state = () => ({
  songs: {
    status: STATUS_TYPES.INIT,
    error: null,
    data: []
  },
  song: {
    status: STATUS_TYPES.INIT,
    error: null,
    data: {}
  },
  prevNext: {
    status: STATUS_TYPES.INIT,
    error: null,
    data: {}
  },
  readMore: {
    status: STATUS_TYPES.INIT,
    error: null,
    data: []
  }
});
/* All states mutations */
const mutations = {
  GET_SONGS(state, payload) {
    state.songs.data = payload
    state.songs.status = STATUS_TYPES.SUCCESS
  },
  GET_SONG(state, payload) {
    state.song.data = payload
    state.song.status = STATUS_TYPES.SUCCESS
  },
  GET_READ_MORE(state, payload) {
     state.readMore.data = payload
     state.readMore.status = STATUS_TYPES.SUCCESS
  },
  GET_PREV_NEXT(state, payload) {
     state.prevNext.data = payload
     state.prevNext.status = STATUS_TYPES.SUCCESS
  }
};
/* All states getters */
const getters = {
  getSongs: (state) => parsesJSON(state.songs),
  getSong: (state) => parsesJSON(state.song),
  getPrevNext: (state) => parsesJSON(state.prevNext),
  getReadMore: (state) => parsesJSON(state.readMore)
};
/* All states actions */
const actions = {
  async getSongs({ commit }, params, callback) {
    const storeSongs = await this.$content('spotify')
      .limit(12)
      .fetch()
    commit('GET_SONGS', storeSongs)
  },
  async getSong({ commit }, params, callback) {
    const storeSong = await this.$content('spotify', params.slug).fetch()
    commit('GET_SONG', storeSong)
  },
  async getPrevNext({ commit }, params, callback) {
    const [prev, next] = await this.$content('spotify')
      .surround(params.slug)
      .fetch()
    commit('GET_PREV_NEXT', { prev, next })
  },
  async getReadMore({ commit }, params, callback) {	
     const storeReadMore = await this.$content('spotify')
       .where({
         slug: { $ne: params.slug },
       })
       .limit(3)
       .fetch()
     commit('GET_READ_MORE', storeReadMore)
  }
};
/* Export all stores */
export default {
  state,
  mutations,
  getters,
  actions
}