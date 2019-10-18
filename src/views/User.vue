<template>
  <v-container class="fill-height" fluid>
    <v-layout>
      <v-row>
        <v-col xs="12" sm="8" md="6" offset-sm="2" offset-md="3">
          <v-card class="elevation-12">
            <v-toolbar color="success" dark flat>
              <v-toolbar-title>Profile</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="icon">
                <v-icon size="100">
                  mdi-account
                </v-icon>
              </div>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon left>mdi-account</v-icon>
                  Name
                </v-list-item-icon>
                <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon left>mdi-email</v-icon>
                  Email
                </v-list-item-icon>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-btn color="success" min-width="200" to="/edit">
                  Edit Profile
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["user"])
  },
  mounted() {
    const user = this.$store.state.auth.user;
    if (!user.name || !user.email) {
      this.$store.dispatch("auth/getUser");
    }
  }
};
</script>

<style>
.icon {
  text-align: center;
}
</style>
