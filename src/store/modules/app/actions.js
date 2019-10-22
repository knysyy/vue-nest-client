export default {
  openSnackBar({ commit }, { text, color }) {
    if (text && color) {
      commit("setSnackBarText", text);
      commit("setSnackBarColor", color);
      commit("setSnackBar", true);
    }
  }
};
