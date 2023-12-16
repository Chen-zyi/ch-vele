<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutMenu',
  props: ['layoutRoutes'],
})
</script>

<template>
  <template v-for="item in layoutRoutes" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta?.hidden" :index="item.path">
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta?.hidden"
        :index="item.children[0].path"
      >
        <template #title>
          <span>{{ item.children[0].meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
      <LayoutMenu :layoutRoutes="item.children"></LayoutMenu>
    </el-sub-menu>
  </template>
</template>
