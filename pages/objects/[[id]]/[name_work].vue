<template>
    <Navbar
        :links="[{ icon: 'i-heroicons-arrow-left', to: `/objects/${router.params.id}` }, { label: router.params.name_work }]">
        <template #header>
            <UButton @click="modal.open(IspDocJobModal)" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }" />
        </template>
        <template #second>
            <UInput v-model="q" placeholder="Поиск работы..." />
            <VueDatePicker v-model="date"></VueDatePicker>
        </template>
    </Navbar>
    <UTable :columns="columns" :loading="jobStore.loading" :rows="filteredRows">
        <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
    </UTable>
    <div>
    </div>
    <IspDocUnitModal />
    <IspDocJobModal />
</template>
<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { IspDocJobModal } from '#components';
const modal = useModal()
const unitStore = useUnitStore()
const router = useRoute()
const jobStore = useJobStore()
const date = ref('')
const columns = [{
    key: 'name_job',
    label: 'Наименование'
},
{
    key: 'unit',
    label: 'Ед. изм.'
},
{
    key: 'volume',
    label: 'Объем'
}
    ,
{
    key: 'date',
    label: 'Дата'
}, {
    key: 'actions'
}]

const q = ref('');

const filteredRows = computed(() => {
    if (!q.value) {
        return jobStore.job;
    }
    return jobStore.job.filter(person => {
        return Object.values(person).some(value => {
            return String(value).toLowerCase().includes(q.value.toLowerCase());
        });
    });
});

const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row)
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
        label: 'Удалить',
        icon: 'i-heroicons-trash-20-solid',
        click: () => jobStore.deleteJob(row, router.params)
    }]
];

onMounted(async () => {
    await jobStore.fetchJob(router.params)
})
</script>