<template>
    <UModal v-model="unitStore.isOpen">
        <UCard :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: { base: 'grow' }
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Добавить единицы измерения
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="unitStore.isOpen = false" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Назавние организации" name="name_org">
                    <UInput v-model="state.name_org" />
                </UFormGroup>
                <UButton type="submit">
                    Добавить
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>
<script setup lang="ts">
import { object, string, date, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const modal = useModal()
const unitStore = useUnitStore()

const schema = object({
    name_work: string().required("Обязательное поле"),
});
type Schema = InferType<typeof schema>;

const state = reactive({
    name_work: undefined,
    name_org: undefined,
    count: undefined
});

</script>