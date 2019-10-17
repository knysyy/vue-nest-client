<template>
  <v-container class="fill-height" fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card v-for="snippet of snippets" :key="snippet.key" class="mb-3">
          <v-toolbar color="success" dark flat>
            <v-toolbar-title>{{ snippet.title }}</v-toolbar-title>
          </v-toolbar>
          <v-subheader>
            {{ snippet.description }}
          </v-subheader>
          <v-chip
            v-for="label of snippet.labels"
            :key="label.id"
            color="success"
            class="ma-2"
            small
          >
            {{ label.title }}
          </v-chip>
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
  </v-container>
</template>

<script>
import axios from "axios";
import hljs from "highlight.js";
export default {
  data() {
    return {
      snippets: []
    };
  },
  mounted() {
    axios.post("/snippets").then(res => {
      this.snippets = res.data.data.snippets;
    });
  },
  methods: {
    getHighLight(content, language) {
      return hljs.highlightAuto(content, [language]).value;
    }
  }
};
</script>

<style>
code.hljs {
  width: 100%;
}
</style>
