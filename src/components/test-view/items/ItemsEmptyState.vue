<script setup>
import ItemsForm from "@/components/test-view/items/ItemsForm.vue"

import { useDialog } from 'primevue/usedialog'

const dialog = useDialog();

const handleOpenAddItemDialog = () => {
  dialog.open(ItemsForm, {
    props: {
      header: "Add Included Item", modal: true,
    },
  })
}
</script>

<template>
  <section class="w-full flex items-center justify-center pt-20">
    <div class="w-96 flex flex-col gap-2 items-center">
      <img src="@/assets/icons/3d-cube-scan.svg" alt="3D Cube Scan Icon" class="w-[100px] h-[100px]" />
      <h2 class="text-rhino text-sm font-medium text-center">No Included Item have been added yet</h2>
      <p class="text-rhino text-xs font-light text-center">Fuga aut quam ea dolores. Adipisci molestiae nam itaque est
        dolore alias autem.</p>
      <Button :pt="{ root: '!bg-shark !rounded-xl !text-xs !h-8 !border-shark', icon: '!text-[8px]' }" label="Add Item"
        icon="pi pi-plus" @click="handleOpenAddItemDialog" />
    </div>
  </section>
</template>

<style></style>
