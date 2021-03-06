<template>
  <div class="main">
    <v-card class="main-card" v-for="(item, index) in items" :key="item.title" :dark="item.urlToImage !== null" :img="item.urlToImage">
      <v-card-actions class="align-end">
        <v-spacer></v-spacer>
        <v-btn @click="editHeadline(index)" icon>
          <v-icon :color="!item.urlToImage ? '#3F51B5' : ''">mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn @click="$router.push({name: 'content', params: { title: item.title }})" icon>
          <v-icon :color="!item.urlToImage ? '#3F51B5' : ''">mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
      <div v-if="item.watched" class="watch-card">
        <v-card-title>Watched</v-card-title>
      </div>
      <v-card-subtitle> {{ new Date(item.publishedAt).getDateShow() }}</v-card-subtitle>
      <v-card-title :class="!item.urlToImage && 'blue-color'">{{ item.title }}</v-card-title>
      <v-card-text>{{ item.description && truncate(item.description, 100) }}<span class="blue-color cursor-pointer" @click="$router.push({name: 'content', params: { title: item.title }})">Read More</span></v-card-text>
    </v-card>
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title class="headline">Edit Headline</v-card-title>
        <v-card-text>
          <v-text-field :rules="[rules.required, rules.counter]" v-model="dialogData.text"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="amber" text @click="showDialog = false">Cancel</v-btn>
          <v-btn color="indigo" text @click="submitDialog">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data() {
    return {
      showDialog: false,
      dialogData: {
        index: null,
        text: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 100 || 'Max 100 characters'
      },
    }
  },
  methods: {
    truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '... ' : str;
    },
    editHeadline(index) {
      this.dialogData.index = index
      this.dialogData.text = this.items[index].title
      this.showDialog = true
    },
    submitDialog() {
      try {
        if (!this.dialogData.text) {
          this.$store.commit('notification/send', { type: 'warning', text: 'Please input Headline.' })
          return false
        }
        else if (this.dialogData.text.length > 100) {
          this.$store.commit('notification/send', { type: 'warning', text: 'Headline too long.' })
          return false
        }
        this.$store.commit('news/edit', this.dialogData)
        this.$store.commit('notification/send', { type: 'success', text: 'Edited.' })
        this.showDialog = false
      } catch (e) {
        this.$store.commit('notification/send', { type: 'error', text: 'Error when submit edit Headline.' })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 1% 1%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .main-card {
    width: 23%;
    margin: 10px;
    position: relative;

    .watch-card {
      position: absolute;
      right: 0;
      width: 50%;
      background-color: #333;
      opacity: 0.8;
    }
  }
}

@media only screen and (max-width: 768px) {
  .main {
    .main-card {
      width: 46%;
    }
  }
}
@media only screen and (max-width: 480px) {
  .main {
    .main-card {
      width: 90%;
    }
  }
}
</style>
