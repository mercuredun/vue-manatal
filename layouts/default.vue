<template>
  <v-app>
    <v-main>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        class="notification"
        color="blue"
      ></v-progress-linear>
      <v-alert
        :value="notiShow"
        transition="scroll-y-transition"
        class="notification"
        :type="notification.type"
      >{{ notification.text }}</v-alert>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      notiShow: false
    };
  },
  computed: {
    notification() {
      return this.$store.state.notification.data
    },
    loading() {
      return this.$store.state.loading.flag
    }
  },
  watch: {
    notification(newVal) {
      this.notiShow = true
      setTimeout(() => {
        this.notiShow = false
      }, 2000)
    }
  }
};
</script>

<style>
.notification {
  z-index: 999;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
