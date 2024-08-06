<template>
    <div>
        <Navbar :links="[{ label: 'Исп.документация' ,to:'/ispdoc' }, { label: router.params.id }]">
                <template #header>
                <UButton @click=" modal.open(IspDocWorkModal);" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }">
                </UButton>
            </template>
            <template #second>
                <UTabs :items="itemsTab" class="w-full">
                    <template #settings="{ item }">
                        <UForm :state="state" class="space-y-4 w-full" @submit="onSubmit">
                            <div class="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                                <UFormGroup label="Наименование объекта" name="name_object">
                                    <UInput v-model="state.name_work" />
                                </UFormGroup>
                                <UFormGroup label="Застройщик" name="name_object">
                                    <USelectMenu :options="organizationStore.organiztion" v-model="state.zastroyshik"
                                        class="w-full" searchable />
                                </UFormGroup>
                                <UFormGroup label="Лицо, осуществляющее строительство" name="lico_os_str">
                                    <USelectMenu :options="organizationStore.organiztion" v-model="state.lico_os_str"
                                        class="w-full" searchable />
                                </UFormGroup>
                                <UFormGroup label="Лицо, осуществляющее подготовку проектной документации"
                                    name="lico_os_proekt">
                                    <USelectMenu :options="organizationStore.organiztion" v-model="state.lico_os_proekt"
                                        class="w-full" searchable />
                                </UFormGroup>
                            </div>
                            <UButton type="submit" label="Изменить" color="gray" />

                        </UForm>
                    </template>
                    <template #work>
                        <div class="flex p-4">
                            <UInput v-model="q" placeholder="Поиск работ..." />
                        </div>
                        <UTable :loading="workStore.loading" :columns="columns" :rows="workStore.works">
                            <template #open-data="{ row }">
                                <UButton icon="i-heroicons-book-open" label="Открыть" :to="`/objects/${router.params.id}/${row.name_work}`"
                                    color="gray" />
                            </template>
                            <template #actions-data="{ row }">
                                <UDropdown :items="items(row)">
                                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                                </UDropdown>
                            </template>
                        </UTable>
                    </template>
                </UTabs>
            </template>
        </Navbar>


    </div>
</template>
<script setup lang="ts">

definePageMeta({
    title: 'My home page'
})

import { object, string, date, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import { IspDocWorkModal } from '#components';
const organizationStore = useOrganizationStore()
const objectStore = useObjectStore()
const workStore = useWorkStore()
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
const itemsTab = [
    {
        slot: 'work',
        label: 'Работы'
    },
    {
        slot: 'settings',
        label: 'Настройки'
    },
    {
        slot: 'documents',
        label: 'Документы'
    },

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
        click: () => workStore.deleteWork(row)
    }]
];

const state = reactive({
    name_work: undefined,
    zastroyshik: undefined,
    lico_os_str: undefined,
    lico_os_proekt: undefined,
});

onMounted(async () => {
    await organizationStore.fetchOrganization()
    await workStore.fetchWork()
    const d = await objectStore.fetchObjectByID(router.params.id)
    state.name_work = router.params.id
    state.zastroyshik = d.o.zastroyshik
    state.lico_os_str = d.o.lico_os_str
    state.lico_os_proekt = d.o.lico_os_proekt
})

const q = ref('');

</script>