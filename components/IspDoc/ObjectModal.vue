<template>
    <UModal prevent-close v-model="isOpen1" fullscreen>
        <UCard :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: { base: 'grow' }
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Добавить объект
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="modal.close()" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Наименование объекта" name="name_object">
                    <UInput v-model="state.fullname" />
                </UFormGroup>
                <UFormGroup label="Застройщик" name="zastroyshik">
                    <div class="flex gap-4 w-full">
                        <USelectMenu v-model="state.fullname" class="w-full" searchable />
                        <UButton label="+" color="gray" type="button" @click.prevent="isOpen2 = true" />
                    </div>
                </UFormGroup>
                <UButton type="submit">
                    Добавить
                </UButton>
            </UForm>
        </UCard>
        <UModal v-model="isOpen2">
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
                            @click="isOpen2 = false" />
                    </div>
                </template>

                <UForm :schema="schema2" :state="state2" class="space-y-4" @submit="onSubmit2">
                    <UFormGroup label="Назавние организации" name="name_org">
                        <UInput v-model="state2.name_org" />
                    </UFormGroup>
                    <UFormGroup label="ИНН" name="zastroyshik">
                        <div class="flex gap-4 w-full">
                            <UInput v-model="state2.inn" class="w-full" searchable />
                            <UButton label="Заполнить по ИНН" @click="fill_by_inn" color="gray" />
                        </div>
                    </UFormGroup>
                    <UFormGroup label="Адрес организации" name="addres_org">
                        <UInput v-model="state2.addres_org" />
                    </UFormGroup>
                    <UFormGroup label="ОГРН" name="addres_org">
                        <UInput v-model="state2.ogrn" />
                    </UFormGroup>
                    <UFormGroup label="КПП" name="addres_org">
                        <UInput v-model="state2.kpp" />
                    </UFormGroup>
                    <UFormGroup label="СРО" name="addres_org">
                        <UInput v-model="state2.sro" />
                    </UFormGroup>
                    <UFormGroup label="Св-во о регистрации" name="addres_org">
                        <UInput v-model="state2.svvo_reg" />
                    </UFormGroup>
                    <UButton type="submit">
                        Добавить
                    </UButton>
                </UForm>
            </UCard>
        </UModal>
    </UModal>
</template>

<script setup lang="ts">
import { object, string, date, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import { useUserStore } from "~/stores/users"
import {useOrganizationStore } from "~/stores/organization"
const usersStore = useUserStore();
const organizationStore = useOrganizationStore()
const modal = useModal();

const isOpen1 = ref(false)
const isOpen2 = ref(false)

const schema = object({
    name_object: string().required("Обязательное поле"),
});

const schema2 = object({
    name_org: string().required("Обязательное поле"),
    inn: string().required("Обязательное поле"),
    addres_org: string().required("Обязательное поле"),
    kpp: string().required("Обязательное поле"),
    ogrn: string().required("Обязательное поле"),
});
type Schema = InferType<typeof schema>;
type Schema2 = InferType<typeof schema2>;

const state = reactive({
    name_object: undefined,
});

const state2 = reactive({
    name_org: undefined,
    inn: undefined,
    addres_org: undefined,
    kpp:undefined,
    ogrn:undefined,
    svvo_reg: undefined,
    sro:undefined
});

const fill_by_inn = async () => {
    var inn = state2.inn;
    var url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    var token = "20defa76b6273253c20e0213cb383ddfe51c60aa";
    var options = {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({ query: inn })
    }
    const res = await $fetch(url, options).then((r) => {
        console.log(r.suggestions[0])
        state2.name_org = r.suggestions[0].value
        state2.addres_org = r.suggestions[0].data.address.value
        state2.ogrn = r.suggestions[0].data.ogrn
        state2.kpp = r.suggestions[0].data.kpp

    })

}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    usersStore.addUser(event.data)
    modal.close();
}
async function onSubmit2(event: FormSubmitEvent<Schema2>) {
    organizationStore.addOrganization(event.data)
    isOpen2.value = false
}
</script>
