<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-toolbar color="success" flat>
            <v-toolbar-title>Snippets Add</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Title"
                    v-model="title"
                    :counter="50"
                    :rules="titleRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Description"
                    v-model="description"
                    :counter="255"
                    :rules="descriptionRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-label>Labels</v-label>
                  <vue-tags-input
                    placeholder=""
                    v-model="tag"
                    :tags="tags"
                    :autocomplete-items="preProcessing"
                    @tags-changed="newTags => (tags = newTags)"
                  ></vue-tags-input>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    label="Content"
                    v-model="content"
                    :rules="contentRules"
                    required
                  ></v-textarea>
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
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" text @click="close">Close</v-btn>
            <v-btn color="success" text :disabled="!valid" @click="addSnippet"
              >Add</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  data() {
    return {
      tag: "",
      tags: [],
      title: "",
      description: "",
      content: "",
      favorite: false,
      languageId: null,
      favoriteData: [
        {
          text: "True",
          value: true
        },
        {
          text: "False",
          value: false
        }
      ],
      handlers: [],
      valid: true,
      lazy: false,
      titleRules: [
        v => !!v || "Title is Required",
        v => (v && v.length <= 50) || "Title Must be less than 50 characters"
      ],
      descriptionRules: [
        v =>
          (v && v.length <= 255) ||
          "Description Must be less than 255 characters"
      ],
      contentRules: [v => !!v || "Content is Required"]
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
    preProcessing() {
      return this.$store.state.label.labels
        .filter(label => {
          return (
            label.title.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
          );
        })
        .map(label => {
          return {
            ...label,
            text: label.title
          };
        });
    }
  },
  methods: {
    ...mapMutations("snippet", ["setAddDialog", "toggleAddDialog"]),
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    addSnippet() {
      const { title, description, content, favorite, languageId } = this;
      Promise.all(
        this.tags.map(async tags => {
          if (tags.id) {
            return tags.id;
          }
          const label = await this.$store.dispatch(
            "label/createLabel",
            tags.text
          );
          return label.id;
        })
      )
        .then(async labelIds => {
          const context = {
            title,
            description,
            content,
            favorite,
            languageId,
            labelIds
          };
          await this.$store.dispatch("snippet/createSnippet", context);
          await this.$store.dispatch("app/openSnackBar", {
            text: "Added a Snippet",
            color: "primary"
          });
          this.toggleAddDialog();
        })
        .catch(this.handleError);
    },
    close() {
      this.reset();
      this.toggleAddDialog();
    },
    handleError(err) {
      if (err.message === "Network Error") {
        this.$store.dispatch("app/openSnackBar", {
          text: "Network Error Occurred",
          color: "error"
        });
      }
    }
  },
  components: {
    VueTagsInput
  }
};
</script>

<style>
.vue-tags-input {
  background-color: #424242 !important;
  border-bottom: 1px white solid;
}
.vue-tags-input .ti-autocomplete {
  background-color: #424242;
  border: 1px white solid;
}
.vue-tags-input .ti-input {
  border: none;
}
</style>
