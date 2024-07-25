<template>
    <UButton @click="generatePDF" icon="i-heroicons-document-arrow-down" class='m-2' label="Скачать" color="gray" />
    <UTable :rows="workTime" :columns="column_tabel">
        <template #actions-data="{ row }">
            <div>
                <USelect v-model="row.hoursWorked" :options="[0, 4, 8]" @change="() => updateHoursWorked(row)" />
            </div>
        </template>
    </UTable>
</template>
<script setup>
const column_tabel = [
    { key: 'fullname', label: 'ФИО', },
    { key: 'hoursWorked', label: "Кол-во отр. часов" },
    { key: 'days', label: "Кол-во отр. дней" }
]

const workTime = ref([])

async function get_hours() {
    const r = await $fetch('/api/users/get_total_hours')
    let d = []
    r.forEach(person => {
        d.push({ ...person, })
    })
    console.log(d)
    workTime.value = r
}

onMounted(async () => {
    await get_hours()

});

async function generatePDF() {
    const data = workTime.value
    const r = $fetch('/api/users/print_pdf', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

</script>