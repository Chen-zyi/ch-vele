<script setup lang="ts">
import LayoutMenu from './menu.vue'
import { useRoute } from 'vue-router'
// import { routes } from '@/router/routes'
import { layoutRoutes } from '../../router/routes'

const $route = useRoute()
</script>

<template>
  <el-aside width="200px" class="shadow-xl">
    <el-scrollbar>
      <el-menu
        text-color="#000"
        active-text-color="#84cc16"
        :default-active="$route.path"
        :router="true"
      >
        <LayoutMenu :layoutRoutes="layoutRoutes" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
