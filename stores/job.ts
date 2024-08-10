import { defineStore } from 'pinia'
export const useJobStore = defineStore('job', () => {
    const job = ref([])
    const loading = ref(false)
    const addJob = async (job, router) => {
        loading.value = true
        const send = { jobs: job, route: router }
        const res = await fetch('/api/job/add', { method: 'POST', body: JSON.stringify(send) })
        await fetchJob(router)
        loading.value = false
    }

    const fetchJob = async (router) => {
        loading.value = true
        const res = await fetch('/api/job/fetch', { method: 'POST', body: JSON.stringify(router) })
        const resp = await res.json()
        job.value = resp.o
        loading.value = false
    }

    const deleteJob = async (job, router) => {
        console.log(job)
        loading.value = true
        const send = { jobs: job, route: router }
        const res = await fetch('/api/job/delete', { method: 'POST', body: JSON.stringify(router) })
        await fetchJob(router)
        loading.value = false
    }

    return { job, addJob, fetchJob, loading, deleteJob }

})