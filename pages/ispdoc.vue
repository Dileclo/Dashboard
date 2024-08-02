<template>
    <Navbar label="Исп. документация">
        <template #header>
            <UButton @click="modal.open(IspDocObjectModal);" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }">
            </UButton>
        </template>
    </Navbar>
    <UTable :columns="columns" />
</template>
<script setup type="ts">
import { IspDocObjectModal } from '#components';
const organizationStore = useOrganizationStore()
const modal = useModal()
const columns = [{
    key: 'name_object',
    label: 'Наименование объекта'
}]

onMounted(async () => {
    const d = await organizationStore.fetchOrganization()
}
)

</script>