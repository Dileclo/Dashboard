<template>
    <div>
        <Navbar :label="router.params.id">
            <template #header>
                <UButton @click=" modal.open(IspDocWorkModal);" icon="i-heroicons-plus"
                    :ui="{ rounded: 'rounded-full' }">
                </UButton>
            </template>
            <template #second>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Наименование работы" name="name_object">
                        <UInput v-model="state.name_work" />
                    </UFormGroup>
                </UForm>
            </template>
        </Navbar>
        <div class="flex p-4">
            <UInput v-model="q" placeholder="Поиск работ..." />
        </div>
        <UTable :columns="columns">
            <template #open-data="{ row }">
                <UButton label="0" />
            </template>
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </div>
</template>
<script setup lang="ts">
import { object, string, date, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import { IspDocWorkModal } from '#components';
const objectStore = useObjectStore()
const router = useRoute()
const modal = useModal()
const columns = [
    {
        key: 'open',
    },
    {
        key: 'name_work',
        label: 'Наименование работы',
        class: 'w-full'
    },
    {
        key: 'actions',
    }
]

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

const state = reactive({
    name_object: undefined,
});

const q = ref('');

</script>