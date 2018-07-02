import axios from 'axios'
// axios.defaults.baseURL = process.env.host
const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  setItem ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:9999/file/set', data).then(res => {
        console.log(res)
        resolve()
      })
    })
  },
  getItem ({ commit }, data) {
    console.log('data',data)
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:9999/file/get', data).then(res => {
        console.log(res)
        resolve(res.data.msg)
      })
    })
  },
  removeItem ({ commit }, data) {
    axios.post('http://localhost:9999/file/delete', data).then(res => {
      console.log(res)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
