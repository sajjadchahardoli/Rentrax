import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaxStore = defineStore('tax', () => {
  // State
  const items = ref([])
  const isLoading = ref(false)

  // Actions
  async function fetchTaxes() {
    isLoading.value = true
    try {
      const { status, data } = await this.axios.get('/taxes')
      if (status === 200) {
        items.value = data
      }
    } catch (error) {
      console.error('Failed to fetch taxes:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addTax(form) {
    try {
      const response = await this.axios.post('/taxes', form)
      if (response.status === 201) {
        items.value.push(response.data)
      }
      return response
    } catch (error) {
      console.error('Failed to add tax:', error)
      throw error
    }
  }

  async function updateTax(id, form) {
    try {
      const response = await this.axios.put(`/taxes/${id}`, form)
      if (response.status === 200) {
        const index = items.value.findIndex((item) => item.id === id)
        if (index !== -1) {
          items.value[index] = response.data
        }
      }
      return response
    } catch (error) {
      console.error('Failed to update tax:', error)
      throw error
    }
  }

  async function deleteTax(id) {
    try {
      const response = await this.axios.delete(`/taxes/${id}`)
      if (response.status === 200 || response.status === 204) {
        const index = items.value.findIndex((item) => item.id === id)
        if (index !== -1) {
          items.value.splice(index, 1)
        }
      }
      return response
    } catch (error) {
      console.error('Failed to delete tax:', error)
      throw error
    }
  }

  return {
    items,
    isLoading,
    fetchTaxes,
    addTax,
    updateTax,
    deleteTax,
  }
})
