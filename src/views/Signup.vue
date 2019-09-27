<template>
  <div>
    <h2>SignUp Page</h2>
    <form @submit="signup">
      <div>
        <input type="text" placeholder="Name" v-model="name" />
      </div>
      <div>
        <input type="email" placeholder="Your Email" v-model="email" />
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  </div>
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
      let info = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("signup", info)
        .then(() => this.$route.push("/login"));
    }
  }
};
</script>

<style></style>
