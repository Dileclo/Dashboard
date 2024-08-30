<template>
    <UModal>
        <UCard :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: { base: 'grow' }
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Добавить материал
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="modal.close()" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Наименование" name="name">
                    <UInput v-model="state.title" />
                </UFormGroup>
                <div class="flex justify-between w-full gap-4">
                    <UFormGroup label="Тип материала" class="w-full" name="type">
                        <USelectMenu v-model="state.type" :options="types" />
                    </UFormGroup>

                    <UFormGroup label="Склад" class="w-full" name="warehouse">
                        <div class="flex gap-4 w-full">
                            <USelectMenu option-attribute="title" v-model="state.warehouse" class="w-full"
                                :options="warehouseStore.warehouse" />
                            <UButton label="+" color="gray" @click="warehouseStore.isOpen = true" />

                        </div>
                    </UFormGroup>
                </div>

                <div class="flex justify-between w-full gap-4">
                    <UFormGroup label="Цвет RAL" class="w-full" name="color">
                        <USelectMenu searchable  v-model="state.color" :options="colors" />
                    </UFormGroup>
                    <UFormGroup label="Толщина" class="w-full" name="thickness">
                        <USelectMenu searchable v-model="state.thickness" :options="thickness" />
                    </UFormGroup>
                </div>
                <div class="flex justify-between w-full gap-4">

                    <UFormGroup label="Длина, м" class="w-full" name="length">
                        <UInput type="number" v-model="state.length" />
                    </UFormGroup>
                    <UFormGroup label="Количество, шт" class="w-full" name="count">
                        <UInput type="number" v-model="state.count" />
                    </UFormGroup>
                </div>
                <UFormGroup label="Вес, т" name="weight">
                    <UInput type="number" v-model="state.weight" />
                </UFormGroup>
                <UFormGroup label="Цена" name="price">
                    <UInput type="number" v-model="state.price" />
                </UFormGroup>
                <UFormGroup label="Сумма" name="price">
                    <UInput type="number" v-model="total" />
                </UFormGroup>
                <UButton type="submit">
                    Добавить
                </UButton>
            </UForm>
        </UCard>
        <ModalWarehouse v-model="warehouseStore.isOpen" />
    </UModal>
</template>
<script setup lang="ts">
import { colors, thickness } from '@/utils/colors'
import { object, string, date, number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const modal = useModal()
const materialStore = useMaterialStore()
const warehouseStore = useWarehouseStore()
const dayjs = useDayjs();
const types = [
    { label: 'Проф.труба', value: 'tube' },
    { label: 'Профлист', value: 'proflist' },
    { label: 'Лист металла', value: 'metal_sheet' },
    { label: 'Саморезы', value: 'screw' },
    { label: 'Другое', value: 'other' },
]
const schema = object({
    title: string().required("Обязательное поле"),
    price: string().required("Обязательное поле"),
    weight: string().required("Обязательное поле"),
    color: string().required("Обязательное поле"),
    thickness: string().required("Обязательное поле"),
    type: object().required("Выберите тип материала"),

});
type Schema = InferType<typeof schema>;

const state = reactive({
    title: undefined,
    type: undefined,
    price: undefined,
    color: undefined,
    thickness: undefined,
    length: undefined,
    weight: undefined,
    count: undefined,
    warehouse: undefined,
    created_at: dayjs().format("DD MM YYYY HH:mm")
});
const total = computed(() => state.weight * state.price);

async function onSubmit(event: FormSubmitEvent<Schema>) {
    await materialStore.addMaterial(event.data)
    modal.close()
}

</script>