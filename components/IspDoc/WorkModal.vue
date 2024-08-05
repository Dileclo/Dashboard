<template>
    <UModal @close="modal.close" >
        <UCard :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: { base: 'grow' }
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Добавить работу
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="modal.close" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Наименование работы" name="name_object">
                    <UInput v-model="state.name_work" />
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

const router = useRoute()
const modal = useModal()

const schema = object({
    name_work: string().required("Обязательное поле"),
});
type Schema = InferType<typeof schema>;

const state = reactive({
    name_work: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    modal.close();
}

</script>