<script setup>
import ListHeader from "@/components/test-view/common/ListHeader.vue"
import PricingList from "@/components/test-view/pricing/PricingList.vue"
import PricingForm from "@/components/test-view/pricing/PricingForm.vue"


import { usePricingStore } from '@/stores/pricing'
import { useDialog } from 'primevue/usedialog'

const dialog = useDialog();

const pricingStore = usePricingStore();
pricingStore.fetchPriceNames();

const handleOpenAddItemDialog = () => {
  dialog.open(PricingForm, {
    props: {
      header: "Add Pricing Item", modal: true,
    },
  })
}
</script>

<template>
  <div>
    <ListHeader title="Pricing" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      @add-item="handleOpenAddItemDialog" />
    <PricingList />
  </div>
</template>

<style></style>
