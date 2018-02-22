import Vue from 'vue'
import Router from 'vue-router'
import axios from './common/interceptors'
import VueAxios from 'vue-axios'
import routes from './routes'
import filters from './common/filters'
import vueExtend from './common/vueExtend'
import HttpClient from './common/httpClient'
// import VueLazyload from 'vue-lazyload'

Vue.use(Router)
Vue.use(VueAxios, axios)
// Vue.use(VueLazyload, {
// 	error: '',//这个是请求失败后显示的图片
// 	loading: '',//这个是加载的loading过渡效果
// 	attempt: 1, // 尝试次数
// })
//开启DEBUG
Vue.config.silent = false;
//是否允许 vue-devtools 检查代码。
Vue.config.devtools = true;
// Vue.http.options.emulateJSON = false;
// Vue.http.options.headers = {
// 	'Content-Type': 'application/json; charset=UTF-8'
// };
Vue.prototype.HttpClient = HttpClient;
window.HttpClient = HttpClient;



new Vue({
	router: new Router({ routes })
}).$mount("#app");
