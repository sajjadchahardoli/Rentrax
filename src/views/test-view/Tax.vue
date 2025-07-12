<script setup>
import ListHeader from "@/components/test-view/common/ListHeader.vue"
import TaxList from "@/components/test-view/tax/TaxList.vue"
import TaxForm from "@/components/test-view/tax/TaxForm.vue"

import { useTaxStore } from '@/stores/tax'
import { useDialog } from 'primevue/usedialog'

const dialog = useDialog();

const taxStore = useTaxStore();
taxStore.fetchTaxes();

const handleOpenAddItemDialog = () => {
  dialog.open(TaxForm, {
    props: {
      header: "Add Tax Item", modal: true,
    },
  })
}
</script>

<template>
  <div>
    <ListHeader title="Tax Management" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      @add-item="handleOpenAddItemDialog" />
    <TaxList />
  </div>
</template>

<style></style>
