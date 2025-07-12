<script setup>
import items from "@/statics/items"
</script>

<template>
  <ul class="grid grid-cols-3 gap-[10px] pt-[18px]">
    <li v-for="item in items" :key="item.id" class=" flex gap-4 p-3 border border-gray-light rounded-xl">
      <img :src="item.image" class="w-[114px] h-[114px] object-cover" />
      <div class="flex flex-col justify-center gap-1">
        <p class="text-xs font-medium text-shark">{{ item.title }}</p>
        <p class="text-sm font-bold text-shark">{{ item.amount }}</p>
        <p class="text-xs  text-waterloo">Included for <span class="font-bold">{{ item.includeFor }}</span></p>
        <Tag v-bind="item.type" class="w-min !text-xs !h-5"></Tag>
      </div>
    </li>
  </ul>
</template>

<style></style>
