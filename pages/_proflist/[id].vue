<template>
    <Navbar :links="[{ label: 'Профнастил', to: '/proflist' }, { label: 'Заказ № ' + router.params.id }]">
    </Navbar>
    <UTable :columns="columns" :rows="order"></UTable>
</template>
<script setup lang="ts">
const orderStore = useOrderStore()
const router = useRoute()
const order = ref([])
const columns = [{
    key: 'id',
    label: "#"
}, {
    key: 'material',
    label: 'Наименование'
},
{
    key: 'length',
    label: 'Длина,мм'
},
{
    key: 'unit',
    label: 'Ед.изм'
},
{
    key: "price",
    label: 'Цена'
},
{
    key: 'count',
    label: 'Количество'
},
{
    key: 'total',
    label: "Итого"
}]
onMounted(async () => {
    const d = await orderStore.fetchOrderById(router.params.id)
    order.value = d.o.bucket
})
</script>