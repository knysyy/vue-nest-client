<template>
  <v-app-bar flat app>
    <v-app-bar-nav-icon @click.stop="onClick" />

    <v-toolbar-title v-text="title" />

    <v-spacer />

    <template v-if="isAuthenticated">
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
    <template v-else>
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
    ...mapMutations("app", [
      "setDrawer",
      "toggleDrawer",
      "setSnackBarText",
      "setSnackBar"
    ]),
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    async logout() {
      await this.$store.dispatch("auth/logout");
      await this.$router.push("/login");
      this.setSnackBarText("Logout Successfully");
      this.setSnackBar(true);
    }
  }
};
</script>
