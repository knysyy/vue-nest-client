<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="snippet of snippets"
        :key="snippet.key"
        cols="12"
        sm="12"
        md="6"
      >
        <v-card class="mb-3">
          <v-toolbar color="success" flat>
            <v-toolbar-title>{{ snippet.title }}</v-toolbar-title>
          </v-toolbar>
          <v-subheader>
            {{ snippet.description }}
          </v-subheader>
          <div class="ml-2">
            <v-chip color="primary" class="ma-2" small>
              {{ snippet.language.title }}
            </v-chip>
            <v-chip
              v-for="label of snippet.labels"
              :key="label.id"
              color="success"
              class="ma-2"
              small
            >
              {{ label.title }}
            </v-chip>
          </div>
          <v-card-text class="dark">
            <pre
              class="hljs"
              v-html="getHighLight(snippet.content, snippet.language.title)"
            ></pre>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="success">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <search-dialog />
    <add-dialog />
  </v-container>
</template>

<script>
import hljs from "highlight.js";
export default {
  computed: {
    snippets() {
      return this.$store.state.snippet.snippets;
    }
  },
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
    getHighLight(content, language) {
      return hljs.highlightAuto(content, [language]).value;
    },
    async getSnippets() {
      const labelId = parseInt(this.$route.query.labelId, 10);
      await this.$store.dispatch(
        "snippet/getSnippets",
        isNaN(labelId) ? {} : { labelIds: [labelId] }
      );
    }
  },
  components: {
    SearchDialog: () => import("@/components/snippet/SearchDialog"),
    AddDialog: () => import("@/components/snippet/AddDialog")
  }
};
</script>

<style>
pre.hljs {
  width: 100%;
}
</style>
