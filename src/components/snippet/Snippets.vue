<template>
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
          <v-spacer />
          <v-btn
            text
            icon
            :color="snippet.favorite ? 'yellow' : 'white'"
            @click="favoriteSnippet(snippet.id, !snippet.favorite)"
          >
            <v-icon>
              mdi-star
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-subheader>
          {{ snippet.description }}
        </v-subheader>
        <div class="ml-2">
          <v-chip
            v-if="snippet.language.title"
            color="primary"
            class="ma-2"
            small
          >
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
          <v-btn color="success" :to="{ path: `/snippet/${snippet.id}` }"
            >Edit</v-btn
          >
          <v-btn color="error" @click="deleteSnippet(snippet.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import hljs from "highlight.js";
export default {
  computed: {
    snippets() {
      return this.$store.state.snippet.snippets;
    }
  },
  methods: {
    getHighLight(content, language) {
      return hljs.highlightAuto(content, [language]).value;
    },
    async favoriteSnippet(id, favorite) {
      await this.$store.dispatch("snippet/favoriteSnippet", { id, favorite });
    },
    async deleteSnippet(snippetId) {
      this.$store.dispatch("snippet/deleteSnippet", snippetId).then(() => {
        this.$store.dispatch("app/openSnackBar", {
          text: "Deleted Snippet",
          color: "primary"
        });
      });
    }
  }
};
</script>

<style>
pre.hljs {
  width: 100%;
}
</style>
