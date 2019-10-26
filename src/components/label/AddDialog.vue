<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      transition="dialog-bottom-transition"
      max-width="500"
    >
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-card>
          <v-toolbar color="success" flat>
            <v-toolbar-title>Label Add</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-col cols="10">
                  <v-text-field
                    label="Title"
                    v-model="title"
                    :counter="50"
                    :rules="titleRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" text @click="close">Close</v-btn>
            <v-btn color="success" text :disabled="!valid" @click="addLabel"
              >Add</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "",
      valid: true,
      lazy: false,
      titleRules: [
        v => !!v || "Title is Required",
        v => (v && v.length <= 50) || "Title must be less than 50 characters"
      ]
    };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.label.addDialog;
      },
      set(val) {
        this.setAddDialog(val);
      }
    },
    labels() {
      return this.$store.state.label.labels;
    }
  },
  methods: {
    ...mapMutations("label", ["setAddDialog", "toggleAddDialog"]),
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    addLabel() {
      const { title } = this;
      this.$store
        .dispatch("label/createLabel", title)
        .then(() => {
          this.$store.dispatch("app/openSnackBar", {
            text: "Added a Label",
            color: "primary"
          });
          this.close();
        })
        .catch(err => {
          console.log(err);
          if (err.message === "Network Error") {
            this.$store.dispatch("app/openSnackBar", {
              text: "Network Error Occurred",
              color: "error"
            });
          }
        });
    },
    close() {
      this.reset();
      this.toggleAddDialog();
    }
  }
};
</script>
