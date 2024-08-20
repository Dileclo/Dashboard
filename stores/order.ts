import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', () => {
    const orders = ref([])

    const get_order_id = async () => {
        const res = await fetch('/api/order/get_order_id')
        const id = await res.json()
        try {
            return id[0].order_id
        } catch {
            return 0
        }
    }

    const addOrder = (data) =>{
        const res = fetch('/api/order/add', { method: 'POST', body: JSON.stringify(data) })
        console.log(res)
    }

    return { get_order_id,addOrder }
})