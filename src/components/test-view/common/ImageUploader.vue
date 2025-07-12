<!-- components/ImageUploader.vue -->
<script setup>
import { ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast();

const props = defineProps({
  modelValue: File || null
})

const emit = defineEmits(['update:modelValue'])

const previewUrl = ref('')
const fileInput = ref(null)

function handleFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 10 * 1024 * 1024) {
    toast.add({ severity: 'error', summary: 'Error', detail: "File is too big (max 10MB)", life: 5000 });

    return
  }

  emit('update:modelValue', file)
  previewUrl.value = URL.createObjectURL(file)
}

function removeImage() {
  emit('update:modelValue', null)
  previewUrl.value = ''
  fileInput.value.value = null
}

watch(() => props.modelValue, (val) => {
  if (val && typeof val === 'object') {
    previewUrl.value = URL.createObjectURL(val)
  } else {
    previewUrl.value = ''
  }
})
</script>

<template>
  <div class="relative w-[300px] h-[300px] mx-auto rounded-[30px] overflow-hidden">
    <div v-if="previewUrl" class="relative w-full h-full">
      <img :src="previewUrl" class="w-full h-full object-cover" />

      <div class="flex gap-2 absolute top-3 right-3 z-10">
        <Button icon="pi pi-trash" rounded aria-label="trash"
          :pt="{ root: '!w-6 !h-6 !bg-rose !border-rose', icon: '!text-xs' }" @click="removeImage" />
        <Button icon="pi pi-sync" rounded aria-label="sync"
          :pt="{ root: '!w-6 !h-6 !bg-shark !border-shark', icon: '!text-xs' }" @click="removeImage" />
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer dash px-8 py-6"
      @click="fileInput.click()">
      <img src="@/assets/icons/document-upload.svg" />
      <p class="text-sm font-medium text-rhino">Drag image</p>
      <p class="text-xs font-light text-rhino">or</p>
      <button type="button"
        class="bg-shark text-white rounded-xl text-xs h-8 px-3 border border-shark text-sm font-medium">Browse
        File</button>
      <p class="text-xs text-rhino">Max file size: <span class="font-bold text-shark">10 MB</span></p>
      <p class="text-xs text-rhino">Allowed types: <span class="font-bold text-shark">.jpeg, .png, .jpg, .webp</span>
      </p>
    </div>

    <input ref="fileInput" type="file" accept=".jpeg,.jpg,.png,.webp" class="hidden" @change="handleFileChange" />
  </div>
</template>

<style scoped>
.dash {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='%23E5E7EBFF' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 30px;
}
</style>
