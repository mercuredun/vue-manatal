<template>
  <div class="content-container">
    <Navbar></Navbar>
    <v-card v-if="item" class="content-card">
      <div class="content-img">
        <v-img
          :src="item.urlToImage"
          aspect-ratio="1"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
      <v-card-subtitle>Date : {{ new Date(item.publishedAt).getDateShow() }}</v-card-subtitle>
      <v-card-subtitle>Author : {{ item.author }}</v-card-subtitle>
      <v-card-title :class="!item.urlToImage && 'blue-color'">{{ item.title }}</v-card-title>
      <v-card-text>{{ item.description }}</v-card-text>
      <v-card-text>{{ item.content }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Navbar from '~/components/navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      item : null
    }
  },
  computed: {
    ...mapGetters({
      getByTitle: "news/getByTitle"
    })
  },
  methods: {
    fetchData(title) {
      try {
        const data = this.getByTitle(title)
        if (data) {
          this.item = data
        } else {
          this.$store.commit('notification/send', { type: 'error', text: 'Content not found.' })
          setTimeout(() => {
            this.$router.push('/')
          }, 3000)
        }
      } catch (e) {
        this.$store.commit('notification/send', { type: 'error', text: 'Something went wrong!' })
      }
    }
  },
  created() {
    const title = this.$route.params.title
    this.fetchData(title)
  },
  watch: {
    "$route.params.title"(title) {
      this.fetchData(title) // if title changes, will refectch data
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  margin-top: 2.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content-card {
    width: 100%;
    padding: 2.5%;
    .content-img {
      padding: 2.5% 10%;
    }
  }
}
</style>
