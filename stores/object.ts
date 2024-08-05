import { defineStore } from 'pinia'

export const useObjectStore = defineStore('object', () => {
    const toast = useToast();
    const objects = ref([])
    const loading = ref(false)

    const fetchObjects = async () => {
        loading.value = true
        const response = await fetch('/api/objects/fetch')
        const data = await response.json()
        objects.value = data.o
        loading.value = false
    }
    
    const fetchObjectByID = async (id) => {
        const res = await fetch('/api/objects/fetch_by_id',{method:"POST",body:id})
        return res.json()
    }

    const addObject = async (d) => {
        loading.value = true
        const res = await fetch("/api/objects/add", { method: "POST", body: JSON.stringify(d) })
        await fetchObjects()
    }
    const deleteObject = async (d) => {
        const res = await fetch("/api/objects/delete", { method: "POST", body: JSON.stringify(d) })
        await fetchObjects()
    }
    return { objects, fetchObjects, addObject, deleteObject, loading, fetchObjectByID }
})