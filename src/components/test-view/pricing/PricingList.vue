<script setup>
import { usePricingStore } from '@/stores/pricing'
import { useDialog } from 'primevue/usedialog'
import PricingForm from "@/components/test-view/pricing/PricingForm.vue"
import { useToast } from 'primevue/usetoast'
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

const toast = useToast();

const dialog = useDialog();

const pricingStore = usePricingStore();

const handleOpenEditItemDialog = (nameToEdit) => {
  dialog.open(PricingForm, {
    props: { header: "Edit Pricing Item", modal: true },
    data: { priceName: nameToEdit },
  })
}

const handleDeleteItem = (name) => {
  confirm.require({
    message: "This can affect the order process",
    header: "Are you sure to delete this Item?",
    icon: 'pi pi-info-circle',
    position: "center",
    rejectProps: {
      label: "No, Cancel",
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: "Yes, I’m Sure",
      severity: 'danger',
    },
    accept: async () => {
      try {
        await pricingStore.deletePriceName(name);
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Successfully deleted.', life: 3000 });
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Failed', detail: error.message || 'An error occurred.', life: 3000 });
      }
    }
  });
}
</script>

<template>
  <div>
    <DataTable :value="pricingStore.items" scrollable class="mt-4">
      <template #empty>
        <p class="empty-text">
          {{ pricingStore.fetching ? "Loading ..." : "No Result" }}
        </p>
      </template>
      <Column field="name" header="Price Name">
        <template #body="{ data }">
          {{ data }}
        </template>
      </Column>
      <Column headerClass="[&>div]:justify-end [&>div]:pl-5 w-28" frozen alignFrozen="right">
        <template #body="{ data }">
          <div>
            <Button icon="pi pi-pencil" rounded text severity="secondary" @click="handleOpenEditItemDialog(data)" />
            <Button icon="pi pi-trash" rounded text severity="danger" @click="handleDeleteItem(data)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style></style>
