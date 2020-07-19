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
  remove (state, text) {
    state.list = state.list.filter(l => l.title !== text.title)
  },
  edit (state, text) {
    state.list[text.index].title = text.text
  }
}

export const getters = {
  getByTitle: state => title => state.list.find(l => l.title === title)
}
