<script setup>
import { useTaxStore } from '@/stores/tax';
import { inject, onMounted, reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast'
import * as yup from 'yup'

const toast = useToast();

const dialogRef = inject('dialogRef')
const { tax } = dialogRef?.value.data || {}

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required'),
})

const form = reactive({ name: '', amount: '' })
const errors = ref({})
const loading = ref(false)

const taxStore = useTaxStore()

const submitForm = async () => {
  errors.value = {};
  loading.value = true

  try {
    await validationSchema.validate(form, { abortEarly: false })
    let response;
    if (tax)
      response = await taxStore.updateTax(tax.id, form)
    else
      response = await taxStore.addTax(form)

    if ([200, 201].includes(response.status))
      dialogRef.value.close();

  } catch (err) {
    if (err.name === 'ValidationError') {
      err.inner.forEach(e => {
        errors.value[e.path] = [e.message]
      })
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 5000 });
    }
    return
  } finally {
    loading.value = false
  }

}

onMounted(() => {
  if (tax) {
    Object.keys(form).forEach((key) => form[key] = tax[key])
  }
})
</script>

<template>
  <form @submit.prevent="submitForm()" class="flex flex-col gap-4 w-96">
    <div class="flex flex-col gap-2">
      <label>Tax Name</label>
      <InputText v-model="form.name" :invalid="errors.name" fluid />
      <small v-if="errors.name" v-text="errors.name[0]" class="text-sm text-red-600" />
    </div>
    <div class="flex flex-col gap-2">
      <label>Amount ($) </label>
      <InputNumber variant="filled" v-model="form.amount" :invalid="errors.amount" class="ltr" fluid />
      <small v-if="errors.amount" v-text="errors.amount[0]" class="text-sm text-red-600" />
    </div>
    <div class="w-full flex justify-end">
      <Button :pt="{ root: '!bg-shark !h-8 !w-1/2 !rounded-xl !tex-xs' }" :label="tax ? 'Edit Item' : 'Add Item'"
        type="submit" severity="success" :loading="loading" />
    </div>
  </form>
</template>

<style></style>
