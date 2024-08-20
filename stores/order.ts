import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', () => {
    const orders = ref([])

    const fetchOrder = async () => {
        const res = await fetch('/api/order/fetch')
        const resp = await res.json()
        console.log(resp)
        const order = resp.o.map(item => {
            const total_price = item.bucket.reduce((acc, curr) => acc + curr.total, 0)

            return { ...item, customer: item.customer.label, total_price }
        })
        console.log(order)
        orders.value = order
    }
    const fetchOrderById = async (id) => {
        const res = await fetch("/api/order/fetchById/", { method: 'POST', body: id })
        const order = await res.json()
        return order
    }
    const get_order_id = async () => {
        const res = await fetch('/api/order/get_order_id')
        const id = await res.json()
        try {
            return id[0].order_id
        } catch {
            return 0
        }
    }

    const addOrder = (data) => {
        const res = fetch('/api/order/add', { method: 'POST', body: JSON.stringify(data) })
        fetchOrder()
    }

    return { get_order_id, addOrder, fetchOrder, orders, fetchOrderById }
})