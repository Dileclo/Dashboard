import { defineStore } from 'pinia'

export const useObjectStore = defineStore('object', () => {
    const toast = useToast();
    const objects = ref([])

    const fetchObjects = async () => {
        const response = await fetch('/api/objects/fetch')
        const data = await response.json()
        objects.value = data.objects
    }

    const addObject = async (d) => {
        const res = await fetch("/api/objects/add", { method: "POST", body: JSON.stringify(d) })
    }
    return { objects, fetchObjects, addObject }
})