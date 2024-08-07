import { defineStore } from 'pinia'

export const useWorkStore = defineStore('work', () => {
    const works = ref([])
    const loading = ref(false)

    const fetchWork = async (work) => {
        loading.value = true
        const r = await fetch('/api/objects/works/fetch_all',{method:'POST',body:JSON.stringify(work)})
        const res = await r.json()
        works.value = res.o
        loading.value = false

    }

    const addWork = async (w) => {
        loading.value = true
        const r = await fetch('/api/objects/works/add', { method: 'POST', body: w })
        await fetchWork()
        loading.value = false

    }

    const deleteWork = async (work) => {
        console.log(work)
        loading.value = true
        const r = await fetch('/api/objects/works/delete', { method: 'POST', body: JSON.stringify(work) })
        await fetchWork()
        loading.value = false
    }
    return { works, fetchWork, deleteWork, addWork, loading }
})  