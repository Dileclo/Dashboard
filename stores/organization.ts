import { defineStore } from 'pinia'

export const useOrganizationStore = defineStore('organization', () => {
    const toast = useToast();
    const organiztion = ref([])

    const fetchOrganization = async () => {
        const res = await fetch("/api/organization/fetch")
        console.log("Dele",res)
    }
    const addOrganization = async (d) => {
        const res = await $fetch("/api/organization/add", { method: "POST", body: JSON.stringify(d) })
    }
    const deleteOrganization = async () => {
        const res = await fetch("/api/organization/delete")
        const org = await res.json()
        organiztion.value = org
    }
    return { organiztion, fetchOrganization, addOrganization, deleteOrganization }
})