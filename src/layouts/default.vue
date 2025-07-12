<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'
</script>

<template>
  <div class="flex w-full h-screen bg-white-primary">
    <Sidebar />
    <div class="w-full flex flex-1 flex-col overflow-hidden">
      <Header />
      <main class="h-full rounded-xl p-4 m-5 bg-white overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style></style>
