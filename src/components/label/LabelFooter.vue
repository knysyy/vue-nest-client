<template>
  <v-row justify="center">
    <v-col class="pa-1">
      <v-btn color="orange" block @click.stop="toggleSearchDialog">
        <v-icon left>mdi-magnify</v-icon>
        Search
      </v-btn>
    </v-col>
    <v-col class="pa-1">
      <v-btn color="orange" block @click.stop="toggleAddDialog">
        <v-icon left>mdi-plus</v-icon>
        Add
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("label", ["toggleSearchDialog", "toggleAddDialog"])
  }
};
</script>
