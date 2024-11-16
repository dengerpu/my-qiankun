<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="/home">
          <user-outlined />
          <router-link to="/home">  Home</router-link>
        </a-menu-item>
        <a-menu-item key="/vue2">
          <video-camera-outlined />
          <router-link to="/vue2">  Vue2</router-link>
        </a-menu-item>
        <a-menu-item key="/vue3">
          <upload-outlined />
          <router-link to="/vue3">  Vue3</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <span class="main-header">Main Header</span>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <div id="sub-container"></div>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons-vue';
  import { Layout, Menu, } from 'ant-design-vue'
  import { defineComponent, ref, watch } from 'vue';
  import { useRoute } from 'vue-router'
  import actions from './qiankun/actions'
  export default defineComponent({
    components: {
      UserOutlined,
      VideoCameraOutlined,
      UploadOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      ALayout: Layout,
      AMenu: Menu,
      ALayoutSider: Layout.Sider,
      AMenuItem: Menu.Item
    },
  
    setup() {
      const selectedKeys = ref(['/home'])
      const collapsed = ref(false)
      const route = useRoute()
      watch([()=>route.path], pathName => {
        //console.log("pathName", pathName, route)
        selectedKeys.value = pathName
      }, {immediate: true})

      // 注册一个观察者函数
      actions.onGlobalStateChange((state, prevState)=>{
        console.log(state, prevState)
      })

      return {
        selectedKeys,
        collapsed,
      };
    },
  });
  </script>


<style>
*{
  padding: 0;
  margin: 0;
}
.main-header{
  padding: 10px;
  display: inline-block;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
