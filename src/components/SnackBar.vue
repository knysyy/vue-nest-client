<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" color="success" top>
    {{ snackbarText }}
    <v-btn color="white" text @click="onClick">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    timeout: 3000
  }),
  computed: {
    ...mapState("app", ["snackbarText"]),
    snackbar: {
      get() {
        return this.$store.state.app.snackbar;
      },
      set(val) {
        this.setSnackBar(val);
      }
    }
  },
  methods: {
    ...mapMutations("app", ["setSnackBar"]),
    onClick() {
      this.setSnackBar(false);
    }
  }
};
</script>
