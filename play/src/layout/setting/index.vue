<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <el-header
    class="flex relative z-[1300] justify-between items-center shadow"
    style="padding: 0"
  >
    <a
      href="https://github.com/Chen-zyi/ch-vele"
      target="_blank"
      class="block ml-[60px] text-2xl font-mono text-neutral-900 focus:text-neutral-900 active:text-neutral-900 visited:text-neutral-900 no-underline"
    >
      {{ title }}
    </a>
    <div class="mr-[30px]">
      <el-button circle size="small" icon="Refresh" />
      <el-button circle size="small" icon="FullScreen" class="ml-2" />
      <el-switch
        size="large"
        inline-prompt
        active-icon="Moon"
        inactive-icon="Sunny"
        class="ml-2"
      />
    </div>
  </el-header>
</template>

<style scoped lang="scss"></style>
