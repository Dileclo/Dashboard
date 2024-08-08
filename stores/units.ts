import { defineStore } from 'pinia'

export const useUnitStore = defineStore('unit', () => {
    const units = ref([])
    const isOpen = ref(false)
    const addUnit = async (u) =>{
        const res = await fetch('/api/units/add',{method: 'POST',body:u})
    }
    const fetchUnit = async () =>{
        const res = await fetch('/api/units/fetch')
        const data = await res.json()
        units.value = data.o
    }
    const open = ()=>{
        console.log("Hello Pidar")
        isOpen.value = true
    }
    return { units,isOpen,addUnit,fetchUnit,open}

})