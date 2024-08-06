<template>
    <div>
        <Navbar :links="[{ label: 'Главная', to: '/' }, { label: 'Пользователи' }]">
            <template #header>
                <div>
                    <UButton @click=" modal.open(UsersModal);" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }">
                    </UButton>
                </div>
            </template>
            <template #second>
                <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
                <UInput v-model="q" placeholder="Filter people..." />
            </template>
        </Navbar>
        <UTable v-model="selected" :rows="filteredRows" :columns="selectedColumns">
            <template #name-data="{ row }">
                <span :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">
                    {{ row.name }}
                </span>
            </template>
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </div>
    <UsersModal />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { UsersModal } from '#components';
import { useUserStore } from "~/stores/users"

const usersStore = useUserStore();
const modal = useModal();
const columns = [{
    key: 'fullname',
    label: 'ФИО',
    sortable: true
}, {
    key: 'position',
    label: 'Должность'
}, {
    key: 'phone',
    label: 'Номер телефона'
}, {
    key: 'actions'
}];

const selectedColumns = ref([...columns]);
const q = ref('');
const selected = ref([]);

const filteredRows = computed(() => {
    if (!q.value) {
        return usersStore.people;
    }
    return usersStore.people.filter(person => {
        return Object.values(person).some(value => {
            return String(value).toLowerCase().includes(q.value.toLowerCase());
        });
    });
});

const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.name)
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
        click: () => usersStore.deleteUser(row)
    }]
];

onMounted(() => {
    usersStore.fetchUsers();
});
</script>
