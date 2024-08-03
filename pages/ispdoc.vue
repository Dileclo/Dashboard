<template>
    <Navbar label="Исп. документация">
        <template #header>
            <UButton @click="modal.open(IspDocObjectModal);" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }">

            </UButton>
        </template>
    </Navbar>
    <UTable :loading="objectStore.loading" :columns="columns" :rows="objectStore.objects"
        :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
        :progress="{ color: 'primary', animation: 'carousel' }">
        <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
    </UTable>
</template>
<script setup type="ts">
import { IspDocObjectModal } from '#components';
const objectStore = useObjectStore()
const organizationStore = useOrganizationStore()
const modal = useModal()
const columns = [{
    key: 'name_object',
    label: 'Наименование объекта'
},
{
    key: 'actions',
}]

const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.name_object)
    }, {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid'
    }], [{
        label: 'Archive',
        icon: 'i-heroicons-archive-box-20-solid'
    }, {
        label: 'Move',
        icon: 'i-heroicons-arrow-right-circle-20-solid'
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => objectStore.deleteObject(row)
    }]
];

onMounted(async () => {
    await organizationStore.fetchOrganization()
    await objectStore.fetchObjects()
}
)

</script>