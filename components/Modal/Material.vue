<template>
    <UModal fullscreen>
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
                        @click="materialStore.isOpen = false" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Наименование" name="unit">
                    <UInput v-model="state.label" />
                </UFormGroup>
                <UFormGroup label="Цена" name="unit">
                    <UInput v-model="state.price" />
                </UFormGroup>
                <UButton type="submit">
                    Добавить
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>
<script setup lang="ts">
import { object, string, date,number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const modal = useModal()
const materialStore = useMaterialStore()
const schema = object({
    label: string().required("Обязательное поле"),
    price: string().required("Обязательное поле")
});
type Schema = InferType<typeof schema>;

const state = reactive({
    label: undefined,
    price: undefined
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    materialStore.addMaterial(event.data)
}

</script>