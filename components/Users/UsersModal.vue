<template>
    <UModal fullscreen @close="modal.close">
        <UCard :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: { base: 'grow' }
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Добавить сотрудника
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="modal.close" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="ФИО" name="fullname">
                    <UInput v-model="state.fullname" />
                </UFormGroup>

                <UFormGroup label="Должность" name="position">
                    <UInput v-model="state.position" />
                </UFormGroup>
                <UFormGroup label="Дата рождения" name="date_of_birth">
                    <UInput v-model="state.date_of_birth" type="date" />
                </UFormGroup>
                <UFormGroup label="Номер телефона" name="phone">
                    <UInput v-model="state.phone" />
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

const usersStore = useUserStore();
const modal = useModal();

const schema = object({
    fullname: string().required("Обязательное поле"),
    position: string().required("Обязательное поле"),
    date_of_birth: date().required("Обязательное поле"),
    phone: string().required("Обязательное поле")
});
type Schema = InferType<typeof schema>;

const state = reactive({
    fullname: undefined,
    position: undefined,
    date_of_birth: undefined,
    phone: undefined,
    role: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { signOut, data: session } = useAuth();

    usersStore.addUser({...event.data,auth: session.value.user?.email })
    modal.close();
}
</script>
