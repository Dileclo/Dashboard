<template>
    <Navbar label="Календарь">
        <template #second>
            <div class="flex items-center gap-4 w-full max-md:justify-between pr-4">
                <UButton @click="subtractDay" icon="i-heroicons-arrow-left" color="gray" />
                {{ formattedDate }}
                <UButton @click="addDay" icon="i-heroicons-arrow-right" color="gray" />
                <UButton @click="today" label="Сегодня" color="gray" />
            </div>
        </template>
    </Navbar>
    <UTabs :items="items" class="w-full">
        <template #calendar="{ item }">
            <UTable :rows="people" :columns="columns">
                <template #actions-data="{ row }">
                    <div>
                        <USelect v-model="row.hoursWorked" :options="[0, 4, 8]" @change="() => updateHoursWorked(row)" />
                    </div>
                </template>
            </UTable>
        </template>
        <template #tabel="{ item }">
            <UsersUserTabel/>
        </template>
    </UTabs>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import useDayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useUserStore } from '~/stores/users';

const usersStore = useUserStore();
const dayjs = useDayjs;
dayjs.locale('ru');

const date = ref(dayjs());

const items = [{
    slot: 'calendar',
    label: 'Календарь'
}, {
    slot: 'tabel',
    label: 'Табель'
}]

const columns = [
    { key: 'fullname', label: 'ФИО' },
    { key: 'actions', label: 'Действия' }
];



const { data: people, pending, refresh } = await useLazyAsyncData('people', async () => {
    const formattedDateForAPI = date.value.format('YYYY-MM-DD');
    return $fetch('/api/users/get_users_by_date', {
        method: 'POST',
        body: JSON.stringify({ date: formattedDateForAPI })
    }).then(response => response.map(person => ({
        ...person,
        hoursWorked: person.hoursWorked || 0
    })));
});



onMounted(async () => {
    await refresh();

});

watch(date, async () => {
    await refresh();
});

const formattedDate = computed(() => date.value.format('DD MMM YYYY'));

const addDay = async () => {
    date.value = date.value.add(1, 'day');
    await refresh();
};

const subtractDay = async () => {
    date.value = date.value.subtract(1, 'day');
    await refresh();
};

const today = () => {
    date.value = dayjs();
};

const updateHoursWorked = async (row) => {
    const formattedDateForAPI = date.value.format('YYYY-MM-DD');
    await $fetch("/api/users/update_hours_worked", {
        method: "POST",
        body: JSON.stringify({
            row: row,
            hoursWorked: row.hoursWorked,
            date: formattedDateForAPI
        })
    });
    await refresh();
};

</script>
