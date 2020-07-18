<template>
  <div class="filter">
    <div class="title-text">Headlines</div>
    <v-btn small color="primary">FILTER</v-btn>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  padding: 1% 2.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title-text {
    color: #3F51B5;
    font-size: 25px;
    font-weight: 300;
  }
}

@media only screen and (max-width: 480px) {

}
</style>
