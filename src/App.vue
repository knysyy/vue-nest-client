<template>
  <v-app>
    <core-app-bar />
    <core-drawer />
    <core-view />
    <core-footer />
  </v-app>
</template>

<script>
export default {
  components: {
    CoreAppBar: () => import("@/components/AppBar"),
    CoreDrawer: () => import("@/components/Drawer"),
    CoreFooter: () => import("@/components/Footer"),
    CoreView: () => import("@/components/View")
  }
};
</script>
