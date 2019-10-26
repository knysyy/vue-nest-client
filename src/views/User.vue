<template>
  <v-container class="fill-height" fluid>
    <v-layout>
      <v-row>
        <v-col xs="12" sm="8" md="6" offset-sm="2" offset-md="3">
          <v-card class="elevation-12">
            <v-toolbar color="success" dark flat>
              <v-toolbar-title>Profile</v-toolbar-title>
              <v-spacer />
              <v-btn fab small @click="isEditing = !isEditing">
                <v-icon v-if="isEditing">mdi-close</v-icon>
                <v-icon v-else>mdi-pencil</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <div class="icon">
                <v-icon size="100">
                  mdi-account
                </v-icon>
              </div>
              <v-form>
                <v-text-field
                  label="Name"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="name"
                  :disabled="!isEditing"
                />
                <v-text-field
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="email"
                  :disabled="!isEditing"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="success" :disabled="!isEditing" @click="editUser">
                Edit Profile
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isEditing: false,
      name: "",
      email: ""
    };
  },
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    setUser() {
      const user = this.user;
      this.name = user.name;
      this.email = user.email;
    },
    editUser() {
      const user = {
        name: this.name,
        email: this.email
      };
      this.$store
        .dispatch("auth/editUser", user)
        .then(async () => {
          await this.$store.dispatch("app/openSnackBar", {
            text: "Edit Successfully",
            color: "primary"
          });
          this.isEditing = false;
        })
        .catch(async err => {
          if (err.message === "Network Error") {
            await this.$store.dispatch("app/openSnackBar", {
              text: "Network Error Occurred",
              color: "error"
            });
          }
        });
    }
  },
  watch: {
    user() {
      this.$nextTick(() => this.setUser());
    }
  },
  mounted() {
    const user = this.$store.state.auth.user;
    if (!!user.name && !!user.email) {
      this.setUser();
    } else {
      this.$store.dispatch("auth/getUser");
    }
  }
};
</script>

<style>
.icon {
  text-align: center;
}
</style>
