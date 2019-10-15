<template>
  <v-container class="fill-height" fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card v-for="snippet of snippets" :key="snippet.key" class="mb-2">
          <v-card-title>
            {{ snippet.title }}
          </v-card-title>
          <v-chip v-for="label of snippet.labels" :key="label.id" class="ma-2">
            {{ label.title }}
          </v-chip>
          <blockquote class="blockquote">
            {{ snippet.description }}
          </blockquote>
          <v-card-text>
            <highlight-code :lang="snippet.language.title">
              {{ snippet.content }}
            </highlight-code>
          </v-card-text>
          <v-card-actions>
            <v-btn text>Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      snippets: []
    };
  },
  mounted() {
    axios.get("/snippets").then(res => {
      this.snippets = res.data.data.snippets;
    });
  }
};
</script>

<style>
code.hljs {
  width: 100%;
}
</style>
