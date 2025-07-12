<script setup>
import ImageUploader from "@/components//test-view/common/ImageUploader.vue"

import { reactive } from "vue"

const form = reactive({
  name: '',
  price: null,
  includedFor: null,
  type: 'rent',
  image: null,
});
</script>

<template>
  <form class="w-[572px]" @submit="submitForm">
    <ImageUploader v-model="form.image" />

    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-[6px]">
        <label class="text-sm font-medium text-rhino">Name</label>
        <InputText v-model="form.name" fluid />
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div class="flex flex-col gap-[6px]">
          <label class="text-sm font-medium text-rhino">Price ($)</label>
          <IconField class="w-full">
            <InputIcon class="pi pi-money-bill" />
            <InputText v-model="form.price" placeholder="34" class="w-full" />
          </IconField>
        </div>

        <div class="flex flex-col gap-[6px]">
          <label class="text-sm font-medium text-rhino">Included for</label>
          <IconField class="w-full">
            <InputIcon class="pi pi-eye" />
            <Select v-model="form.includedFor" :options="cities" optionLabel="name" class="!w-full" />
          </IconField>
        </div>
      </div>

      <div class="flex flex-col gap-[6px]">
        <label class="text-sm font-medium text-rhino">Type</label>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2" v-for="option in ['rent', 'borrow', 'sell']" :key="option">
            <RadioButton :inputId="option" :value="option" v-model="form.type" />
            <label :for="option" class="capitalize">{{ option }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-10 w-">
      <Button :pt="{ root: '!bg-shark !rounded-xl !text-xs !h-8 !border-shark w-64' }" label="Add Item" type="submit" />
    </div>
  </form>
</template>

<style></style>
