<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="success" flat>
          <v-toolbar-title>Snippets Add</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Title" v-model="title"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Description"
                  v-model="description"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-textarea label="Content" v-model="content"></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Favorite"
                  :items="favoriteData"
                  v-model="favorite"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  item-text="title"
                  item-value="id"
                  :items="languages"
                  label="Language"
                  v-model="languageId"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  item-text="title"
                  item-value="id"
                  :items="labels"
                  label="Label"
                  multiple
                  v-model="labelIds"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="toggleAddDialog">Close</v-btn>
          <v-btn color="success" text @click="add">Add</v-btn>
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
      title: "",
      description: "",
      content: "",
      favorite: false,
      languageId: null,
      labelIds: [],
      favoriteData: [
        {
          text: "True",
          value: true
        },
        {
          text: "False",
          value: false
        }
      ]
    };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.snippet.addDialog;
      },
      set(val) {
        this.setAddDialog(val);
      }
    },
    languages() {
      return this.$store.state.language.languages;
    },
    labels() {
      return this.$store.state.label.labels;
    }
  },
  methods: {
    ...mapMutations("snippet", ["setAddDialog", "toggleAddDialog"]),
    add() {
      const {
        title,
        description,
        content,
        favorite,
        languageId,
        labelIds
      } = this;

      const context = {
        title,
        description,
        content,
        favorite,
        languageId,
        labelIds
      };
      this.$store.dispatch("snippet/createSnippet", context);
      this.toggleAddDialog();
    }
  }
};
</script>
