import '../public-path'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
/* eslint-disable */
let instance = null;

function render(props = {}) {
  const { container } = props;
  // instance = new Vue({
  //   render: (h) => h(App),
  // }).$mount(container ? container.querySelector('#app') : '#app');
  const shadowApp = container.firstChild.shadowRoot.querySelector('#app')
  instance = new Vue({
    render: (h) => h(App),
  }).$mount(container ? shadowApp : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue2] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue2] props from main framework', props);
  render(props);
}
export async function unmount() {
  console.log('[vue2] vue app unmount');
  // instance.$destroy()
  // instance.$el.innerHTML = ''
  instance = null
}