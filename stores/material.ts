import { defineStore } from 'pinia'

export const useMaterialStore = defineStore('material', () => {
    const materials = ref([])
    const isOpen = ref(false)

    const addMaterial = (material) =>{

    }

    return{materials,isOpen,addMaterial}

})