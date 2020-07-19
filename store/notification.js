export const state = () => ({
  data: {
    type: 'info',
    text: ''
  }
})

export const mutations = {
  send (state, text) {
    state.data = text
  }
}
