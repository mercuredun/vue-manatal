export const state = () => ({
  list: []
})

export const mutations = {
  create (state, text) {
    state.list = text
  }
}
