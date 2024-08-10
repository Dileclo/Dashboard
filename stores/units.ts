// #TODO вывод нотификашек
import { defineStore } from 'pinia'
export const useUnitStore = defineStore('unit', () => {
    const units = ref([])
    const isOpen = ref(false)
    const toast = useToast()

    const addUnit = async (u) => {
        const res = await fetch('/api/units/add', { method: 'POST', body: JSON.stringify(u) }).then((s) => {
            toast.add({ title: "Успешно добавлено" })
        }).catch((err) => {
            toast.add({ title: "Данная ед. изм уже существует" })
        })
        await fetchUnit()
    }
    const fetchUnit = async () => {
        const res = await fetch('/api/units/fetch')
        const data = await res.json()
        units.value = data.o
    }
    return { units, addUnit, fetchUnit, isOpen }

})