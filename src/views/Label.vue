<template>
  <v-container>
    <v-list>
      <template v-for="(label, index) in labels">
        <v-list-item :key="label.id" class="mb-2">
          <v-list-item-title>{{ label.title }}</v-list-item-title>
        </v-list-item>
        <v-divider v-if="index + 1 < labels.length" :key="index" />
      </template>
    </v-list>
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
