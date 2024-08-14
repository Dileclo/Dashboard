import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', () => {
    const authUser = sessionStorage.getItem('
    const register = async (form: any) => {
        const reg = await fetch('/api/auth/register', { 'method': 'POST', body: JSON.stringify(form) })
        console.log(reg)
    }

    return { register,authUser }
})