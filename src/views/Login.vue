<template>
  <v-container class="fill-height" fluid>
    <v-layout>
      <v-row>
        <v-col xs="12" sm="8" md="6" offset-sm="2" offset-md="3">
          <v-card class="elevation-12">
            <v-toolbar color="success" flat>
              <v-toolbar-title>Login Form</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
              <div class="icon">
                <v-icon avator size="100">
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
                <v-btn color="success" min-width="200" @click="login">
                  Login
                </v-btn>
              </v-row>
            </v-card-actions>
            <v-card-actions>
              <v-row justify="center">
                <v-btn text small color="primary">
                  Forgot Password?
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
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: async function() {
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch("auth/login", { email, password })
        .then(async () => {
          await this.$router.push(this.$route.query.redirect || "/");
          await this.$store.dispatch("app/openSnackBar", {
            text: "Login Successfully",
            color: "primary"
          });
        })
        .catch(async err => {
          if (err.message === "Network Error") {
            await this.$store.dispatch("app/openSnackBar", {
              text: "Network Error Occurred",
              color: "error"
            });
          } else {
            await this.$store.dispatch("app/openSnackBar", {
              text: "Email Or Password is wrong",
              color: "error"
            });
          }
        });
    }
  }
};
</script>

<style>
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #424242 inset;
  -webkit-text-fill-color: white !important;
}
.icon {
  text-align: center;
}
</style>
