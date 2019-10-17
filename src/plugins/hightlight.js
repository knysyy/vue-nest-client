import Vue from "vue";
import VueHighlightJS from "vue-highlight.js";
import HighLightJS from "highlight.js";

import vue from "vue-highlight.js/lib/languages/vue";

HighLightJS.registerLanguage("vue", vue);
import "highlight.js/styles/solarized-dark.css";

Vue.use(VueHighlightJS);
