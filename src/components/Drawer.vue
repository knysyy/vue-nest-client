<template>
  <v-navigation-drawer
    v-model="inputValue"
    app
    color="grey darken-2"
    dark
    floating
    persistent
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar color="white">
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/v.png"
          height="34"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">
        VUETIFY MD
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
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
        to: "/user",
        icon: "mdi-account",
        text: "User Profile"
      },
      {
        to: "/table-list",
        icon: "mdi-clipboard-outline",
        text: "Table List"
      },
      {
        to: "/typography",
        icon: "mdi-format-font",
        text: "Typography"
      },
      {
        to: "/icons",
        icon: "mdi-chart-bubble",
        text: "Icons"
      },
      {
        to: "/maps",
        icon: "mdi-map-marker",
        text: "Maps"
      },
      {
        to: "/notifications",
        icon: "mdi-bell",
        text: "Notifications"
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
    }
  }
};
</script>
