import Vue from "vue";
import VueHighlightJS from "vue-highlight.js";

import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import php from "highlight.js/lib/languages/php";
import java from "highlight.js/lib/languages/java";
import vue from "vue-highlight.js/lib/languages/vue";

import "highlight.js/styles/solarized-dark.css";

Vue.use(VueHighlightJS, {
  languages: {
    css,
    javascript,
    python,
    typescript,
    php,
    java,
    vue
  }
});
