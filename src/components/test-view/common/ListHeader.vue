<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex justify-between">
    <div class="rounded-xl">
      <h2 class="text-sm font-semibold text-shark">{{ title }}</h2>
      <p class="text-xs text-waterloo">{{ description }}</p>
    </div>
    <Button :pt="{ root: '!bg-niagara rounded-xl !text-sm !h-8', icon: '!text-xs' }" label="Add Item" icon="pi pi-plus"
      @click="$emit('addItem')" />
  </div>
</template>

<style></style>
