<script setup lang="ts">
import Menu from './menu/index.vue'
import Setting from './setting/index.vue'
import Main from './main/index.vue'
</script>

<template>
  <div class="container h-screen font-semibold">
    <el-container class="h-full" direction="vertical">
      <Setting></Setting>
      <el-container>
        <Menu></Menu>
        <Main></Main>
      </el-container>
    </el-container>
  </div>
</template>
