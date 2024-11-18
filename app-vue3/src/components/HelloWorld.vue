<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p class="test">Vue3子项目中的 这里是测试 style</p>
    <button @click="setWindowA">Vue3 set window.a</button>
    <button @click="getWindowA">Vue3 get window.a</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    getWindowA(){
      console.log(window.a)
    },
    setWindowA(){
      window.a = 'vue3'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.test{
  color: red;
}
</style>
