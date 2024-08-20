import { defineStore } from 'pinia'

export const useMaterialStore = defineStore('material', () => {
    const materials = ref([])
    const isOpen = ref(false)

    const addMaterial = async (material) => {
        const res = await fetch('/api/material/add', { method: 'POST', body: JSON.stringify(material) })
        isOpen.value = false
        await fetchMaterial()
    }
    const fetchMaterial = async () => {
        const res = await fetch('/api/material/fetch')
        const resp = await res.json()
        materials.value = resp.o
    }
    return { materials, isOpen, addMaterial, fetchMaterial }

})