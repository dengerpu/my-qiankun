import '../public-path'
import App from './App.vue'
import { createApp } from 'vue'
// import actions from './qiankun/actions'

let instance = null

function render(props = {}) {
  instance = createApp(App)
  const { container } = props;
  console.log(props)
  // actions.setActions(props)
  // instance.mount(container ? container.querySelector('#app') : '#app');
  const shadowApp = container.firstChild.shadowRoot.querySelector('#app')
  instance.mount(shadowApp ? shadowApp : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('bootstraped-vue3-app')
  //console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('mount-vue3-app')
  //console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  console.log('unmount-vue3-app')
  instance.unmount()
  //instance = null
}
