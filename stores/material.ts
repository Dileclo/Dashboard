import { defineStore } from 'pinia'

export const useMaterialStore = defineStore('material', () => {
    const materials = ref([])
    const isOpen = ref(false)
    const loading = ref(false)
    const addMaterial = async (material) => {
        const res = await fetch('/api/material/add', { method: 'POST', body: JSON.stringify(material) })
        isOpen.value = false
        await fetchMaterial()
    }
    const fetchMaterial = async () => {
        const res = await fetch('/api/material/fetch')
        const resp = await res.json()
        console.log(resp.o)
        const result = resp.o.map((item) => {
            return {...item, label: item.title+" "+ item.thickness}
        })
        console.log(result)
        materials.value = result
    }
    return { materials, isOpen, addMaterial, fetchMaterial,loading }

})