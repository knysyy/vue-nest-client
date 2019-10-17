<template>
  <v-app>
    <core-app-bar />
    <core-drawer />
    <core-view />
    <core-footer />
    <core-snack-bar />
  </v-app>
</template>

<script>
export default {
  components: {
    CoreAppBar: () => import("@/components/core/AppBar"),
    CoreDrawer: () => import("@/components/core/Drawer"),
    CoreFooter: () => import("@/components/core/Footer"),
    CoreView: () => import("@/components/core/View"),
    CoreSnackBar: () => import("@/components/core/SnackBar.vue")
  }
};
</script>
