<template>
    <div class="flex items-center gap-2 p-5">
        <UButton @click="subtractMonth" icon="i-heroicons-arrow-left" color="gray" />
        {{ formattedMonth }}
        <UButton @click="addMonth" icon="i-heroicons-arrow-right" color="gray" />
        <UButton @click="today" color="gray" label="Тек.месяц" />
        <UButton @click="columns" color="gray" label="REF" />
    </div>
    <UTable :rows="workTime" :columns="column_tabel"></UTable>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import useDayjs from 'dayjs';
import 'dayjs/locale/ru';

const column_tabel = ref([
    { key: 'phone', label: 'ФИО' },
    { key: 'hoursWorked', label: "Кол-во отр. часов" },
    { key: 'days', label: "Кол-во отр. дней" }
]);

const dayjs = useDayjs;
dayjs.locale('ru');

const date = ref(dayjs());
const workTime = ref([]);

const formattedMonth = computed(() => date.value.format('MMMM'));

const columns = async () => {
    const daysInMonth = date.value.daysInMonth();
    column_tabel.value = [
        { key: 'fullname', label: 'ФИО' },
    ];
    for (let i = 1; i <= daysInMonth; i++) {
        column_tabel.value.push({ key: i.toString(), label: i.toString() });
    }
    const res = []
    const d = await $fetch('/api/users/get_hours_by_date',{method:"POST",body: JSON.stringify(date.value.format("MM"))})
    d.forEach(person => {
        res.push({ ...person });
    });
    console.log(d);
    workTime.value = res;
};

const addMonth = () => {
    date.value = date.value.add(1, 'M');
    columns();
};

const subtractMonth = () => {
    date.value = date.value.subtract(1, 'M');
    columns();
};

const today = () => {
    date.value = dayjs();
    columns();
};

onMounted(async () => {
    columns();
});
</script>
