<template>
    <Navbar :links="[{ label: 'Главная', to: '/' }, { label: 'Склад' }]">
        <template #header>
            <UButton @click=" modal.open(ModalWarehouse);" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }">
            </UButton>
        </template>
        <template #second>
            <UInput v-model="q" placeholder="Поиск склада..." />
        </template>
    </Navbar>
    <UTable :columns="columns" :rows="filtredRows"></UTable>

</template>
<script setup lang="ts">
import { ModalWarehouse } from '#components';
const modal = useModal()
const warehouseStore = useWarehouseStore()
const q = ref('')

const filtredRows = computed(() => {
    if (!q.value) {
        return warehouseStore.warehouse
    }
    return warehouseStore.warehouse.filter(warehouse => {
        return Object.values(warehouse).some(value => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
})

const columns = [{
    key: 'title',
    label: 'Наименование',
    sortable: true
},
{
    key: 'address',
    label: 'Адрес',
},
{
    key: 'actions'}
]

</script>