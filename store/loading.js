export const state = () => ({
  flag: false
})

export const mutations = {
  send (state, text) {
    state.flag = text
  }
}
