<template>
    <UModal prevent-close>
        <UCard :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: { base: 'grow' }
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Добавить склад 
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="warehouseStore.isOpen=false" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Наименование" name="name">
                    <UInput v-model="state.title" />
                </UFormGroup>
                <UFormGroup label="Адрес" name="address">
                    <UInput v-model="state.address" />
                </UFormGroup>
                <UButton type="submit">
                    Добавить
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>
<script setup lang="ts">
import { object, string, date, number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const warehouseStore = useWarehouseStore()
const modal = useModal()
const materialStore = useMaterialStore()
const dayjs = useDayjs();
const schema = object({
    title: string().required("Обязательное поле"),
    address: string().required("Обязательное поле")
});
type Schema = InferType<typeof schema>;

const state = reactive({
    title: undefined,
    address: undefined,
    created_at: dayjs().format("DD MM YYYY HH:mm")
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    warehouseStore.addWarehouse(event.data)
}

onMounted(() => {
    warehouseStore.getWarehouse()
})

</script>