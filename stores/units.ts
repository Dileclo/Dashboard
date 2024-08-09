import { defineStore } from 'pinia'

export const useUnitStore = defineStore('unit', () => {
    const units = ref([])

    const addUnit = async (u) => {
        const res = await fetch('/api/units/add', { method: 'POST', body: u })
        await fetchUnit()
    }
    const fetchUnit = async () => {
        const res = await fetch('/api/units/fetch')
        const data = await res.json()
        units.value = data.o
    }
    return { units, addUnit, fetchUnit }

})