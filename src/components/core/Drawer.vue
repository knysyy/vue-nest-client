<template>
  <v-navigation-drawer
    v-model="inputValue"
    app
    color="grey darken-2"
    floating
    persistent
  >
    <v-list nav>
      <v-list-item>
        <v-list-item-title>
          Snippet App
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>

    <template v-slot:append v-if="isAuthenticated">
      <v-list nav>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-title class="font-weight-light">
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data: () => ({
    links: [
      {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "Dashboard"
      },
      {
        to: "/snippet",
        icon: "mdi-code-tags",
        text: "Snippet"
      },
      {
        to: "/label",
        icon: "mdi-label",
        text: "Label"
      },
      {
        to: "/user",
        icon: "mdi-account",
        text: "User Profile"
      }
    ]
  }),
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },
  methods: {
    ...mapMutations("app", [
      "setDrawer",
      "toggleDrawer",
      "setSnackBarText",
      "setSnackBar"
    ]),
    async logout() {
      await this.$store.dispatch("auth/logout");
      await this.$router.push("/login");
      this.setSnackBarText("Logout Successfully");
      this.setSnackBar(true);
    },
    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
    }
  }
};
</script>
