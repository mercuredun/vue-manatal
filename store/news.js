export const state = () => ({
  list: []
})

export const mutations = {
  create (state, text) {
    state.list = text
  },
  destroy (state) {
    state.list = []
  },
  add (state, text) {
    state.list.push(text)
  },
  remove (state, text) {
    state.list = state.list.filter(l => l.title !== text.title)
  },
  edit (state, text) {
    state.list[text.index].title = text.text
  }
}
