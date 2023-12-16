<script setup lang="ts"></script>

<template>
  <el-main class="h-full" style="padding: 0">
    <router-view class="p-[20px]" v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </el-main>
</template>

<style scoped lang="scss">
.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
