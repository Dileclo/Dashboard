import { defineStore } from 'pinia'
export const useCustomerStore = defineStore('customer', () => {
    const isOpen = ref(false)
    const customers = ref([])

    return {customers,isOpen}
})