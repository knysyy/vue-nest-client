<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="success" dark flat>
            <v-toolbar-title>SignUp Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div class="icon">
              <v-icon size="100">
                mdi-account-plus
              </v-icon>
            </div>
            <v-form>
              <v-text-field
                v-model="name"
                label="Name"
                prepend-icon="mdi-account"
                type="text"
              />
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
              <v-btn color="success" min-width="100" @click="signup">
                SignUp
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signup: function() {
      let user = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("auth/signup", user)
        .then(() => this.$router.push("/"));
    }
  }
};
</script>

<style>
.icon {
  text-align: center;
}
</style>
