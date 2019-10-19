<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="snippet of snippets" :key="snippet.key" md="6">
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
          <v-card-text class="ma-0">
            <pre
              v-html="getHighLight(snippet.content, snippet.language.title)"
              class="black pa-3"
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
    this.$store.dispatch("snippet/getSnippets");
    this.$store.dispatch("language/getLanguages");
    this.$store.dispatch("label/getLabels");
  },
  methods: {
    getHighLight(content, language) {
      return hljs.highlightAuto(content, [language]).value;
    }
  },
  components: {
    SearchDialog: () => import("@/components/snippet/SearchDialog"),
    AddDialog: () => import("@/components/snippet/AddDialog")
  }
};
</script>
