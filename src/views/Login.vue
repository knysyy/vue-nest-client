<template>
  <v-container class="fill-height" fluid>
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="success" dark flat>
              <v-toolbar-title>Login Form</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <div class="icon">
                <v-icon size="100">
                  mdi-account-check
                </v-icon>
              </div>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                />
                <v-text-field
                  v-model="password"
                  label="Password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-btn color="success" min-width="100" @click="login">
                  Login
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
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations("app", ["setSnackBar", "setSnackBarText"]),
    login: async function() {
      const email = this.email;
      const password = this.password;
      await this.$store.dispatch("auth/login", { email, password });
      await this.$router.push(this.$route.query.redirect || "/");
      this.setSnackBarText("Login Successfully");
      this.setSnackBar(true);
    }
  }
};
</script>

<style>
.icon {
  text-align: center;
}
</style>
