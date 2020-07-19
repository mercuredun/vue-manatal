<template>
  <v-app-bar
    dark
    app
    color="indigo"
  >
    <v-toolbar-title>News</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="$emit('error')" icon>
      <v-icon>mdi-alert-circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style lang="scss" scoped>

</style>
