<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="success" flat>
          <v-toolbar-title>Snippets Search</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Title"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Description"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Content"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox label="Favorite"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['javascript', 'typeScript', 'python']"
                  label="Language"
                  multiple
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['Label1', 'Label2']"
                  label="Label"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="toggleDialog">Close</v-btn>
          <v-btn color="success" text @click="toggleDialog">Search</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  computed: {
    dialog: {
      get() {
        return this.$store.state.snippet.dialog;
      },
      set(val) {
        this.setDialog(val);
      }
    }
  },
  methods: {
    ...mapMutations("snippet", ["setDialog", "toggleDialog"])
  }
};
</script>
