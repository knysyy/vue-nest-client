<template>
  <v-container fluid>
    <snippets />
    <search-dialog />
    <add-dialog />
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
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
    ...mapMutations("snippet", ["toggleAddDialog", "setSearchDialog"]),
    async getSnippets() {
      const labelId = parseInt(this.$route.query.labelId, 10);
      await this.$store.dispatch(
        "snippet/getSnippets",
        isNaN(labelId) ? {} : { labelIds: [labelId] }
      );
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.snippet.addDialog) {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        this.toggleAddDialog();
      }
      next(false);
    } else if (this.$store.state.snippet.searchDialog) {
      this.setSearchDialog(false);
      next(false);
    } else {
      next();
    }
  },
  components: {
    Snippets: () => import("@/components/snippet/Snippets"),
    SearchDialog: () => import("@/components/snippet/SearchDialog"),
    AddDialog: () => import("@/components/snippet/AddDialog")
  }
};
</script>
