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
    <UTable show-indexes :rows="people" :columns="columns">
        <template #actions-data="{ row }">
            <div>
                <UCheckbox name="notifications" :modelValue="row.is_present"
                    @update:modelValue="value => toggleAttendance(row, value)" />
            </div>
        </template>
    </UTable>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import useDayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useUserStore } from '~/stores/users'

const usersStore = useUserStore();
const dayjs = useDayjs;
dayjs.locale('ru');

const date = ref(dayjs());

const columns = [
    {
        key: 'fullname',
        label: 'ФИО'
    },
    {
        key: 'actions',
        label: 'Действия'
    }
];

const people = ref([])

const fetchPeopleByDate = async () => {
    const formattedDateForAPI = date.value.format('YYYY-MM-DD');
    const response = await $fetch('/api/users/get_users_by_date', {
        method: 'POST',
        body: JSON.stringify({ date: formattedDateForAPI })
    });
    people.value = response.map(person => ({
        ...person,
        is_present: person.is_present ? true : false
    }));
};

onMounted(() => {
    fetchPeopleByDate();
})

watch(date, () => {
    fetchPeopleByDate();
})

const formattedDate = computed(() => {
    return date.value.format('DD MMM YYYY')
})

const addDay = () => {
    date.value = date.value.add(1, 'day')
}

const subtractDay = () => {
    date.value = date.value.subtract(1, 'day')
}

const today = () => {
    date.value = dayjs()
}

const toggleAttendance = async (row, value) => {
    const formattedDateForAPI = date.value.format('YYYY-MM-DD');
    await $fetch("/api/users/update_attendance", {
        method: "POST",
        body: {
            row: row,
            value: value,
            date: formattedDateForAPI
        }
    })
}
</script>
