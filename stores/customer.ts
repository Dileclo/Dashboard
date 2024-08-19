import { defineStore } from 'pinia'
export const useCustomerStore = defineStore('customer', () => {
    const isOpen = ref(false)
    const customers = ref([])
    const toast = useToast()
    const addCustomer = async (customer: any) =>{
        const r = await fetch('/api/customer/add',{method:'POST',body:JSON.stringify(customer)})
        console.log(r.status)
        if (r.status==400){
            toast.add({ title: "Данная компания уже существует",color:"red"})
            return
        }
        toast.add({ title: "Компания успешно добавлена" })
        await fetchCustomer()
        isOpen.value = false
    }
    const fetchCustomer = async () =>{
        const r = await fetch('/api/customer/fetch_all')
        customers.value = r.json()
    }

    return {customers,isOpen,addCustomer,fetchCustomer}
})