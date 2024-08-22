import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', () => {
    const orders = ref([])
    const isLoading = ref(false)
    const dayjs = useDayjs()
    const fetchOrder = async () => {
        isLoading.value = true
        const res = await fetch('/api/order/fetch')
        const resp = await res.json()
        console.log(resp)
        const order = resp.o.map(item => {
            let color = ""
            const total_price = item.bucket.reduce((acc, curr) => acc + curr.total, 0)
            if (item.status === "Получен") {
                color = 'bg-yellow-500/40'
            }
            if (item.status === "Готово") {
                color = 'bg-green-500/60'
            }
            return {
                ...item, customer: item.customer.label, total_price, class: color
            }
        })
        console.log(order)
        orders.value = order
        isLoading.value = false

    }
    const fetchOrderById = async (id) => {
        isLoading.value = true

        const res = await fetch("/api/order/fetchById/", { method: 'POST', body: id })
        const order = await res.json()
        isLoading.value = false

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

    const addOrder = async (data) => {
        const res = fetch('/api/order/add', { method: 'POST', body: JSON.stringify(data) })
        await fetchOrder()
    }

    const acceptOrder = async (order_id, status) => {
        const res = fetch('/api/order/accept', { method: 'POST', body: JSON.stringify({ order_id, status }) })
        await fetchOrder()
    }

    return { get_order_id, addOrder, fetchOrder, orders, fetchOrderById, isLoading, acceptOrder }
})