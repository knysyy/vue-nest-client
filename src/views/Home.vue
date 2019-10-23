<template>
  <v-container fluid>
    <snippets />
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.getSnippets().catch(err => {
      if (err.message === "Network Error") {
        this.$store.dispatch("app/openSnackBar", {
          text: "Network Error Occurred",
          color: "error"
        });
      }
    });
  },
  methods: {
    async getSnippets() {
      await this.$store.dispatch("snippet/getSnippets", { favorite: true });
    }
  },
  components: {
    Snippets: () => import("@/components/snippet/Snippets")
  }
};
</script>
