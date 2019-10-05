import { set, toggle } from "@/utils/vuex";

export default {
  setDrawer: set("drawer"),
  toggleDrawer: toggle("drawer"),
  setSnackBar: set("snackbar"),
  setSnackBarText: set("snackbarText")
};
