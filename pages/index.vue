<template>
  <div class="main-container">
    <Navbar @error="errorAPI"></Navbar>
    <MainFilter @input="loadData"></MainFilter>
    <Main :items="news"></Main>
  </div>
</template>

<script>
import Navbar from '~/components/navbar.vue'
import MainFilter from '~/components/main/filter.vue'
import Main from '~/components/main/main.vue'

export default {
  components: {
    Navbar,
    MainFilter,
    Main
  },
  data () {
    return {
      apiKeys: '099148be22804e849a0c6fe022b7cf5e'
    }
  },
  computed: {
    news () {
      return this.$store.state.news.list
    }
  },
  methods: {
    async loadData(text) {
      try {
        this.$store.commit('loading/send', true)
        const params = {
          country: 'us',
          q: text,
          apiKey: this.apiKeys
        }
        const data = await this.$axios.get('https://newsapi.org/v2/top-headlines', { params })
        if (data.status === 200) {
          this.$store.commit('news/create', JSON.parse(JSON.stringify(data.data.articles)))
          const storage = localStorage.watched ? JSON.parse(localStorage.watched) : []
          storage.forEach(s => {
            this.$store.commit('news/watch', s)
          })
        }
        this.$store.commit('loading/send', false)
      } catch (e) {
        this.$store.commit('loading/send', false)
        this.$store.commit('notification/send', { type: 'error', text: 'Error when get Article from API.' })
      }
    },
    async errorAPI() {
      try {
        this.$store.commit('loading/send', true)
        await this.$axios.get('https://newsapi.org/v2/sources?apiKey')
        this.$store.commit('loading/send', false)
      } catch (e) {
        this.$store.commit('loading/send', false)
        this.$store.commit('notification/send', { type: 'error', text: 'Error when get Data from API.' })
      }
    },
    async firstload() {
      try {
        this.$store.commit('loading/send', true)
        const data = await this.$axios.get(`https://newsapi.org/v2/sources?apiKey=${this.apiKeys}`)
        if (data.status === 200) {
          this.$store.commit('source/create', JSON.parse(JSON.stringify(data.data.sources)))
        }
        this.$store.commit('loading/send', false)
      } catch (e) {
        this.$store.commit('loading/send', false)
        this.$store.commit('notification/send', { type: 'error', text: 'Error when get Source from API.' })
        setTimeout(() => {
          this.$router.go()
        }, 5000)
      }
    }
  },
  async mounted() {
    await this.firstload()
    await this.loadData()
  },
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
}
</style>
