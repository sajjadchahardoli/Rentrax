<script setup>
import { usePricingStore } from '@/stores/pricing';
import { inject, onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast'
import * as yup from 'yup'

const toast = useToast();

const dialogRef = inject('dialogRef')
const nameToEdit = dialogRef?.value.data?.priceName

// const validationSchema = yup.object({
//   name: yup
//     .string()
//     .required('Price Name is required'),
// })

const name = ref('');
const error = ref(null); // فقط یک متغیر برای خطای همان تک فیلد
const loading = ref(false);

const pricingStore = usePricingStore()

const submitForm = async () => {
  error.value = {};
  loading.value = true

  try {
    await yup.string().required('Price Name is required').validate(name.value);

    let response;
    if (nameToEdit)
      response = await pricingStore.updatePriceName(nameToEdit, name.value)
    else
      response = await pricingStore.addPriceName(name.value)

    if ([200, 201].includes(response.status))
      dialogRef.value.close();

  } catch (err) {
    if (err.name === 'ValidationError') {
      // چون یک فیلد داریم، خطا را مستقیم در متغیر خطا می‌ریزیم
      error.value = err.message;
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 5000 });
    }
    return
  } finally {
    loading.value = false
  }

}

onMounted(() => {
  if (nameToEdit) {
    name.value = nameToEdit;
  }
})
</script>

<template>
  <form @submit.prevent="submitForm()" class="flex flex-col gap-4 w-96">
    <div class="flex flex-col gap-2">
      <label>Price Name</label>
      <InputText v-model="name" :invalid="error" fluid />
      <small v-if="error" v-text="error" class="text-sm text-red-600" />
    </div>
    <div class="w-full flex justify-end">
      <Button :pt="{ root: '!bg-shark !h-8 !w-1/2 !rounded-xl !tex-xs' }" :label="nameToEdit ? 'Edit Item' : 'Add Item'"
        type="submit" severity="success" :loading="loading" />
    </div>
  </form>
</template>

<style></style>
