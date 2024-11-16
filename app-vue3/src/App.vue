<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue3 App"/>
  <button @click="changeState">change global state</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import actions from './qiankun/actions'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    changeState(){
      actions.setGlobalState({a: 200})
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
