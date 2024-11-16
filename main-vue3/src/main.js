import { createApp } from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import { registerMicroApps, start } from 'qiankun'

import { createRouter, createWebHistory } from "vue-router"

const apps = [
  {
    name: 'vue2', // 应用的名字
    entry: 'http://localhost:2001/', // 默认加载这个html，解析里面的js动态的执行（子应用必须支持跨域，内部使用的是 fetch）
    container: '#sub-container', // 要渲染到的容器名id
    activeRule: '/vue2' // 通过哪一个路由来激活
  },
  {
    name: 'vue3',
    entry: 'http://localhost:3001/',
    container: '#sub-container',
    activeRule: '/vue3',
  }
];
// 当匹配到activeRule的时候，请求获取entry资源，渲染到container中
registerMicroApps(apps); // 注册应用
start({
  sandbox: {
    //strictStyleIsolation: true, // 使用shadow dom解决样式冲突
    experimentalStyleIsolation: true // 通过添加选择器范围来解决样式冲突
  }
}); // 开启应用

// 1. 定义路由组件.

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { 
    path: '/home', 
    component: Home,
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

createApp(App).use(router).mount('#app')

const rawPushState = window.history.pushState
  window.history.pushState = (...args) => {
    // 导航前
    rawPushState.apply(window.history, args)
  }

  const rawReplaceState = window.history.replaceState
  window.history.replaceState = (...args)=>{
    rawReplaceState.apply(window.history, args)
  }
