<template>
  <v-app id="app" dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <span v-if="!isAuthenticated">
        <v-btn icon to="/login">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn icon to="/signup">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </span>
      <span v-if="isAuthenticated">
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </span>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: function() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-account-box",
          title: "About",
          to: "/about"
        }
      ],
      title: "Vuetify.js"
    };
  },
  computed: {
    isAuthenticated: function() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
