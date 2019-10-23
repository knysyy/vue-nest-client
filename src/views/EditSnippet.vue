<template>
  <v-container fluid>
    <v-card>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-toolbar color="success" flat>
          <v-toolbar-title>Snippet Edit</v-toolbar-title>
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
          <v-btn color="success" text @click="back">Back</v-btn>
          <v-btn color="success" text :disabled="!valid" @click="editSnippet"
            >Edit</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  data() {
    return {
      tag: "",
      tags: [],
      id: null,
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
  mounted() {
    const id = parseInt(this.$route.params.id, 10);
    if (isNaN(id)) {
      this.back();
      return;
    }
    const snippet = this.$store.state.snippet.snippets.find(snippet => {
      return snippet.id === id;
    });
    if (!snippet) {
      this.back();
      return;
    }
    this.id = snippet.id;
    this.title = snippet.title;
    this.description = snippet.description;
    this.content = snippet.content;
    this.favorite = snippet.favorite;
    this.languageId = snippet.language.id;
    this.tags = snippet.labels.map(label => {
      return {
        ...label,
        text: label.title,
        tiClasses: ["ti-valid"]
      };
    });
  },
  computed: {
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
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    editSnippet() {
      const { id, title, description, content, favorite, languageId } = this;
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
            id,
            title,
            description,
            content,
            favorite,
            languageId,
            labelIds
          };
          await this.$store.dispatch("snippet/updateSnippet", context);
          await this.$store.dispatch("app/openSnackBar", {
            text: "Edited a Snippet",
            color: "primary"
          });
          this.$router.go(-1);
        })
        .catch(this.handleError);
    },
    back() {
      this.reset();
      this.$router.go(-1);
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
.vue-tags-input .ti-autocomplete ul {
  padding-left: 0;
}
.vue-tags-input .ti-input {
  border: none;
}
.vue-tags-input .ti-tags {
  padding-left: 0;
}
</style>
