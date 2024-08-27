<template>
    <Navbar :links="[{ label: 'Главная', to: '/' }, { label: 'Склад' }]">
        <template #header>
            <UButton @click=" modal.open(ModalMaterial);" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }">
            </UButton>
        </template>
        <template #second>
            <UInput v-model="q" placeholder="Поиск склада..." />
        </template>
    </Navbar>
    <UTable :loading="materialStore.loading" :columns="columns" :rows="filtredRows">
        <template #actions-data="{ row }">
            <UDropdown :popper="{ placement: 'bottom-start' }" :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
    </UTable>

</template>
<script setup lang="ts">
import { ModalMaterial } from '#components';
const modal = useModal()
const materialStore = useMaterialStore()
const q = ref('')
const items = (row) => [
    [{
        label: 'Просмотр',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => navigateTo(`/_proflist/${row._id}`)
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
const filtredRows = computed(() => {
    if (!q.value) {
        return materialStore.materials
    }
    return materialStore.materials.filter(material => {
        return Object.values(material).some(value => {
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
    key: 'warehouse.title',
    label: 'Склад',
},
{
    key:"thickness",
    label:"Толщина"
},
{
    key:"color",
    label:"Цвет"
},
{
    key:"length",
    label:"Длина"
},
{
    key:"weight",
    label:"Вес"
},
{
    key: 'actions'
}
]

onMounted(() => {
    materialStore.fetchMaterial()
})

</script>