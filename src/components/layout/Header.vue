<script setup>
defineProps({
  title: {
    type: String,
    default: 'Test Page'
  },
  description: {
    type: String,
    default: 'Eius recusandae pariatur ducimus animi repudiandae.'
  },
  userName: {
    type: String,
    default: 'John Brown'
  },
  userLocation: {
    type: String,
    default: 'Location name'
  },
  userAvatar: {
    type: String,
    default: '/images/urban-alpine.png'
  }
});
</script>

<template>
  <header class="w-full h-20 bg-white flex items-center justify-between px-5">
    <div>
      <h1 class="text-lg font-semibold text-shark">{{ title }}</h1>
      <p class="text-xs text-waterloo">{{ description }}</p>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <div class="border border-gray-200 rounded-xl p-1">
          <img :src="userAvatar" :alt="userName + ' Avatar'" class="h-7 w-7 rounded-lg object-cover">
        </div>
        <div>
          <p class="text-xs text-shark">{{ userName }}</p>
          <p class="text-xs text-waterloo">{{ userLocation }}</p>
        </div>
      </div>
      <Button :pt="{ root: 'hover:!bg-white', icon: '!text-xs text-waterloo font-bold' }" icon="pi pi-chevron-down"
        variant="text" aria-label="User Menu" />
    </div>
  </header>
</template>

<style></style>
