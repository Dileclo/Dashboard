<template>
    <Navbar :links="[{ label: 'Главная', to: '/' }, { label: 'Профнастил' }]">
        <template #header>
            <div>
                <UButton @click=" modal.open(ModalOrder);" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }">
                </UButton>
            </div>
        </template>
        <template #second>
            <UInput v-model="q" placeholder="Поиск..." />
        </template>
    </Navbar>
    <UTable :loading="orederStore.isLoading"
        :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
        :progress="{ color: 'primary', animation: 'carousel' }" :columns="columns" :rows="filteredRows">
        <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
    </UTable>
</template>
<script setup lang='ts'>
useSeoMeta({
    title: "Торговля"
})
import { ModalOrder } from '#components';
const router = useRoute()
const modal = useModal()
const orederStore = useOrderStore()
const columns = [{
    key: "order_id",
    label: "No"
},
{
    key: "created_at",
    label: "Дата"
},
{
    key: "customer",
    label: "Клиент"
},
{
    key: "address",
    label: "Адрес"
},
{
    key: "total_price",
    label: "Сумма",
    sortable:true
},
{
    key: 'status',
    label: "Состояние заказа"
},
{ key: "actions" }]
const q = ref('');
const filteredRows = computed(() => {
    if (!q.value) {
        return orederStore.orders;
    }
    return orederStore.orders.filter(person => {
        return Object.values(person).some(value => {
            return String(value).toLowerCase().includes(q.value.toLowerCase());
        });
    });
});

const items = (row) => [
    [{
        label: 'Просмотр',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => navigateTo(`/_proflist/${row.order_id}`)
    }, {
        label: 'Дублировать',
        icon: 'i-heroicons-document-duplicate-20-solid'
    }], [{
        label: 'Архив',
        icon: 'i-heroicons-archive-box-20-solid'
    },], [{
        label: 'Удалить',
        icon: 'i-heroicons-trash-20-solid',
        click: () => usersStore.deleteUser(row)
    }]
];

onMounted(() => {
    orederStore.fetchOrder()
})
</script>