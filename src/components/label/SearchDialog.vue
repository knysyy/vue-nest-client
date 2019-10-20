<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      transition="dialog-bottom-transition"
      max-width="500"
    >
      <v-card>
        <v-toolbar color="success" flat>
          <v-toolbar-title>Label Search</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Title" v-model="title"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="toggleSearchDialog">Close</v-btn>
          <v-btn color="success" text @click="search">Search</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      title: ""
    };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.label.searchDialog;
      },
      set(val) {
        this.setSearchDialog(val);
      }
    },
    labels() {
      return this.$store.state.label.labels;
    }
  },
  methods: {
    ...mapMutations("label", ["setSearchDialog", "toggleSearchDialog"]),
    search() {
      const { title } = this;
      this.$store.dispatch("label/getLabels", title);
      this.toggleSearchDialog();
      this.title = "";
    }
  }
};
</script>
