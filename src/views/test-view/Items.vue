<script setup>
import ItemsEmptyState from "@/components/test-view/items/ItemsEmptyState.vue"
import ListHeader from "@/components/test-view/common/ListHeader.vue"
import ItemsList from "@/components/test-view/items/ItemsList.vue"
import ItemsForm from "@/components/test-view/items/ItemsForm.vue"

import items from "@/statics/items"

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
  <div class="w-full h-full">
    <ItemsEmptyState v-if="items.length === 0" />
    <template v-else>
      <ListHeader title="Included Items" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        @add-item="handleOpenAddItemDialog" />
      <ItemsList />
    </template>
  </div>
</template>

<style></style>
