<template>
  <v-container>
    <v-card v-for="label of labels" :key="label.id" class="mb-1">
      <v-card-text>{{ label.title }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labels: []
    };
  },
  mounted() {
    axios.get("/labels").then(res => {
      this.labels = res.data.data.labels;
    });
  }
};
</script>
