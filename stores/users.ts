import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
    const toast = useToast();
    const people = ref([])


    async function fetchUsers() {
        const response = await fetch('/api/users/get_users')
        const data = await response.json()
        people.value = data.users
    }


    async function deleteUser(user: any) {
        try {
            const res = await fetch('/api/users/delete_user',
                {
                    method: 'POST',
                    body: JSON.stringify(user)
                })
            toast.add({ title: "Пользователь успешно удален" })

        } catch (err) {

        }

        await fetchUsers()
    }

    async function addUser(user: any) {
        console.log(user)
        try {
            const response = await $fetch("/api/users/add_user", {
                method: 'POST',
                body: JSON.stringify(user),
            });
            console.log(response)
        } catch (err) {
            console.log(err)
        }
        toast.add({ title: "Пользователь успешно добавлен" })
        await fetchUsers();

    }
 
    return { people, fetchUsers, deleteUser, addUser }
})
