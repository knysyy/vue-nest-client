<template>
  <v-app-bar flat app>
    <v-app-bar-nav-icon @click.stop="onClick" />

    <v-toolbar-title v-text="title" />

    <v-spacer />

    <template v-if="!isAuthenticated">
      <v-btn icon to="/login">
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn icon to="/signup">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data: () => ({
    title: null
  }),
  created() {
    this.title = this.$route.name;
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"])
  },
  watch: {
    $route(val) {
      this.title = val.name;
    }
  },
  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
    }
  }
};
</script>
