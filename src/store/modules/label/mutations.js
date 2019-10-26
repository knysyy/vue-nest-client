import { set, toggle } from "@/utils/vuex";
import * as labelsStatuses from "./statuses";

export default {
  setSearchDialog: set("searchDialog"),
  toggleSearchDialog: toggle("searchDialog"),
  setAddDialog: set("addDialog"),
  toggleAddDialog: toggle("addDialog"),
  labelsRequest(state) {
    state.status = labelsStatuses.LABEL_LOADING;
    state.err = null;
  },
  labelsSuccess(state) {
    state.status = labelsStatuses.LABEL_SUCCESS;
  },
  labelsError(state, err) {
    state.status = labelsStatuses.LABEL_ERROR;
    state.error = err;
  },
  setLabels(state, labels) {
    state.labels = labels;
  }
};
