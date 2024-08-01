
import type { IspDocObjectModal } from '#build/components';
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
                        Добавить организацию
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="returnToObject" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Наименование объекта" name="name_object">
                    <UInput v-model="state.fullname" />
                </UFormGroup>
                <UFormGroup label="Застройщик" name="zastroyshik">
                    <div class="flex gap-4 w-full">
                        <USelectMenu v-model="state.fullname" class="w-full" searchable />
                        <UButton label="+" color="gray" />
                    </div>
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
import { useUserStore } from "~/stores/users"
import { IspDocObjectModal } from "#components"

const usersStore = useUserStore();
const modal = useModal();

const schema = object({
    name_object: string().required("Обязательное поле"),
});
type Schema = InferType<typeof schema>;

const state = reactive({
    name_object: undefined,
});

const returnToObject = () =>{
    modal.close()
    setTimeout(() => {
        modal.open(IspDocObjectModal); // Открытие нового модального окна
    }, 300);
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    usersStore.addUser(event.data)
    modal.close();
}
</script>
