import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { borderBox10, borderBox6, borderBox8, scrollBoard, borderBox11 ,loading} from '@jiaminghi/data-view'
import { Dialog, Button, Table, TableColumn, Form, FormItem, Input, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
import "@/assets/css/global.scss"
Vue.use(borderBox10)
Vue.use(borderBox6)
Vue.use(borderBox8)
Vue.use(scrollBoard)
Vue.use(borderBox11)
Vue.use(loading)
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.config.productionTip = false
Vue.prototype.$message = Message;
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
