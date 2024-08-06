import { defineStore } from 'pinia'

export const useWorkStore = defineStore('work', () => {
    const works = ref([])

    const fetchWork = async () =>{
        const r = await fetch('/api/objects/works/fetch_all')
        const res = await r.json()
        works.value = res.o
    }

    const addWork = async (w) =>{
        const r = await fetch('/api/objects/works/add',{method: 'POST',body:w})
    }

    const deleteWork = async () =>{
        const r = await fetch('/api/objects/works/delete')
    }
    return {works,fetchWork,deleteWork,addWork}
})  