    // Подключение Vue 
import Vue from 'vue';
	
	// Подключение главного компонента
import App from './App.vue';
    
    // Блокируем просмотр внутреннего состояния приложения в Production из Vue.js devtools
Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

new Vue({
  	el: '#app',
  	render: h => h(App)
})
