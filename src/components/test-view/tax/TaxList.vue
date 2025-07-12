<script setup>
import { useTaxStore } from '@/stores/tax'
import { useDialog } from 'primevue/usedialog'
import TaxForm from "@/components/test-view/tax/TaxForm.vue"
import { useToast } from 'primevue/usetoast'
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

const toast = useToast();

const dialog = useDialog();

const taxStore = useTaxStore();

const handleOpenEditItemDialog = (data) => {
  const tax = Object.assign({}, data)

  dialog.open(TaxForm, {
    props: { header: "Edit Tax Item", modal: true },
    data: { tax },

  })
}

const handleDeleteItem = (id) => {
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
        await taxStore.deleteTax(id);
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
    <DataTable :value="taxStore.items" scrollable class="mt-4">
      <template #empty>
        <p class="empty-text">
          {{ taxStore.fetching ? "Loading ..." : "No Result" }}
        </p>
      </template>
      <Column field="name" header="Name" />
      <Column field="amount" header="Amount($)" />
      <Column headerClass="[&>div]:justify-end [&>div]:pl-5 w-28" frozen alignFrozen="right">
        <template #body="{ data }">
          <div>
            <Button icon="pi pi-pencil" rounded text severity="secondary" @click="handleOpenEditItemDialog(data)" />
            <Button icon="pi pi-trash" rounded text severity="danger" @click="handleDeleteItem(data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style></style>
