<template>
  <div class="filter">
    <v-text-field class="title-text" @input="$emit('input', text)" v-model="text" placeholder="Headlines" autofocus></v-text-field>
    <v-btn small color="primary">FILTER</v-btn>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      text: ''
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

@media only screen and (max-width: 768px) {
  .filter {
    .title-text {
      font-size: 20px;
    }
  }
}
@media only screen and (max-width: 480px) {
  .filter {
    .title-text {
      font-size: 18px;
    }
  }
}
</style>
