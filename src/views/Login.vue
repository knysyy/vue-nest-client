<template>
  <div>
    <h2>Login Page</h2>
    <form @submit.prevent="login">
      <div>
        <input type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
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
    login: function() {
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/about"));
    }
  }
};
</script>

<style></style>
