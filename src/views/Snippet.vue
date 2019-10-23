<template>
  <v-container fluid>
    <snippets />
    <search-dialog />
    <add-dialog />
  </v-container>
</template>

<script>
export default {
  mounted() {
    Promise.all([
      this.getSnippets(),
      this.$store.dispatch("language/getLanguages"),
      this.$store.dispatch("label/getLabels")
    ]).catch(err => {
      if (err.message === "Network Error") {
        this.$store.dispatch("app/openSnackBar", {
          text: "Network Error Occurred",
          color: "error"
        });
      }
    });
  },
  watch: {
    $route: "getSnippets"
  },
  methods: {
    async getSnippets() {
      const labelId = parseInt(this.$route.query.labelId, 10);
      await this.$store.dispatch(
        "snippet/getSnippets",
        isNaN(labelId) ? {} : { labelIds: [labelId] }
      );
    }
  },
  components: {
    Snippets: () => import("@/components/snippet/Snippets"),
    SearchDialog: () => import("@/components/snippet/SearchDialog"),
    AddDialog: () => import("@/components/snippet/AddDialog")
  }
};
</script>
