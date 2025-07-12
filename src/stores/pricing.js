import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePricingStore = defineStore('pricing', () => {
  // State
  const items = ref([])
  const isLoading = ref(false)

  // Actions
  async function fetchPriceNames() {
    isLoading.value = true
    try {
      const { status, data } = await this.axios.get('/price-names')
      if (status === 200) {
        items.value = data
      }
    } catch (error) {
      console.error('Failed to fetch price names:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addPriceName(name) {
    try {
      const response = await this.axios.post('/price-names', { name })
      if (response.status === 201) {
        items.value.push(response.data)
      }
      return response
    } catch (error) {
      console.error('Failed to add price name:', error)
      throw error
    }
  }

  async function updatePriceName(id, form) {
    try {
      const response = await this.axios.put(`/price-names/${id}`, form)
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

  async function deletePriceName(name) {
    try {
      const response = await this.axios.delete(`/price-names/${name}`)
      if (response.status === 200 || response.status === 204) {
        const index = items.value.findIndex((item) => item === name)
        if (index !== -1) {
          items.value.splice(index, 1)
        }
      }
      return response
    } catch (error) {
      console.error('Failed to delete price name:', error)
      throw error
    }
  }

  return {
    items,
    isLoading,
    fetchPriceNames,
    addPriceName,
    updatePriceName,
    deletePriceName,
  }
})
