import { defineStore } from 'pinia'

export const useOrganizationStore = defineStore('organization', () => {
    const toast = useToast();
    const organiztion = ref([
        {
            id: 'benjamincanac',
            label: 'benjamincanac',
            href: 'https://github.com/benjamincanac',
            target: '_blank',
            avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' }
        }
    ])

    const fetchOrganization = async () => {
        const res = await $fetch("/api/organization/fetch")

        const updatedData = res.o.map(item => {
            const { name_org, ...rest } = item;
            return { ...rest, label: name_org };
        });
        console.log(updatedData);
        organiztion.value = updatedData
        console.log(organiztion.value)

    }
    const addOrganization = async (d) => {
        const res = await $fetch("/api/organization/add", { method: "POST", body: JSON.stringify(d) })
        await fetchOrganization()
    }
    const deleteOrganization = async () => {
        const res = await fetch("/api/organization/delete")
        const org = await res.json()
        organiztion.value = org

    }
    return { organiztion, fetchOrganization, addOrganization, deleteOrganization }
})