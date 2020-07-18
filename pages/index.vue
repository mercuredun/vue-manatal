<template>
  <div class="main-container">
    <Navbar></Navbar>
    <MainFilter></MainFilter>
  </div>
</template>

<script>
import Navbar from '~/components/navbar.vue'
import MainFilter from '~/components/main/filter.vue'

export default {
  components: {
    Navbar,
    MainFilter
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
}
</style>
