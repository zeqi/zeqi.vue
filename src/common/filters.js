import Vue from 'vue'
Vue.filter('filterScore', value => {
  return value / 10;
})