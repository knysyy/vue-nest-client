<template>
  <v-container>
    <v-card v-for="label of labels" :key="label.id" class="mb-2">
      <v-row>
        <v-col col="auto" class="py-0">
          <v-card-text>
            {{ label.title }}
          </v-card-text>
        </v-col>
        <v-col col="auto" class="py-0">
          <v-card-actions>
            <v-spacer />
            <v-btn
              :to="{ path: '/snippet', query: { labelId: label.id } }"
              icon
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon @click="deleteLabel(label.title, label.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <search-dialog />
    <add-dialog />
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  computed: {
    labels() {
      return this.$store.state.label.labels;
    }
  },
  mounted() {
    this.$store.dispatch("label/getLabels").catch(this.handleError);
  },
  methods: {
    ...mapMutations("label", ["toggleAddDialog", "setSearchDialog"]),
    deleteLabel(labelTitle, labelId) {
      this.$store
        .dispatch("label/deleteLabel", labelId)
        .then(() => {
          this.$store.dispatch("app/openSnackBar", {
            text: "Deleted Label",
            color: "primary"
          });
        })
        .catch(this.handleError);
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
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.label.addDialog) {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        this.toggleAddDialog();
      }
      next(false);
    } else if (this.$store.state.label.searchDialog) {
      this.setSearchDialog(false);
      next(false);
    } else {
      next();
    }
  },
  components: {
    SearchDialog: () => import("@/components/label/SearchDialog"),
    AddDialog: () => import("@/components/label/AddDialog")
  }
};
</script>
