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
                        Новый клиент
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="customerStore.isOpen = false" />
                </div>
            </template>
            <UTabs :items="tabs" class="w-full">
                <template #individual="{ item }">
                    <UForm :schema="schemaIndividual" :state="stateIndividual" class="space-y-4" @submit="onSubmit">
                        <div class="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                            <UFormGroup label="Фамилия" class="w-full" name="surname">
                                <UInput v-model="stateIndividual.surname" />
                            </UFormGroup>
                            <UFormGroup label="Имя" class="w-full" name="name">
                                <UInput v-model="stateIndividual.name" />
                            </UFormGroup>
                            <UFormGroup label="Отчество" class="w-full" name="second_name">
                                <UInput v-model="stateIndividual.second_name" />
                            </UFormGroup>
                            <UFormGroup label="Номер телефона" class="w-full" name="phone">
                                <UInput v-model="stateIndividual.phone" />
                            </UFormGroup>

                        </div>
                        <UFormGroup label="Примечание" class="w-full" name="description">
                            <UTextarea v-model="stateIndividual.description" />
                        </UFormGroup>
                        <UButton type="submit">
                            Добавить
                        </UButton>
                    </UForm>
                </template>
                <template #organization="{ item }">
                    <UForm :schema="schemaOrg" :state="stateOrg" class="space-y-4" @submit="onSubmitOrg">
                        <div class="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                            <UFormGroup label="Название организации" class="w-full" name="surname">
                                <UInput v-model="stateOrg.label" />
                            </UFormGroup>
                            <UFormGroup label="Номер телефона" class="w-full" name="name">
                                <UInput v-model="stateOrg.phone" />
                            </UFormGroup>

                            <UFormGroup label="ИНН" class="w-full" name="second_name">
                                <div class="flex gap-4">
                                    <UInput v-model="stateOrg.inn" class="w-full" />
                                    <UButton label="Заполнить" @click="fill_by_inn" />
                                </div>
                            </UFormGroup>
                            <UFormGroup label="Адрес" class="w-full" name="phone">
                                <UInput v-model="stateOrg.address" />
                            </UFormGroup>
                            <UFormGroup label="Контактное лицо (ФИО)" class="w-full" name="phone">
                                <UInput v-model="stateOrg.contact" />
                            </UFormGroup>
                            <UFormGroup label="Email" class="w-full" name="email">
                                <UInput v-model="stateOrg.email" />
                            </UFormGroup>

                        </div>
                        <UFormGroup label="Примечание" class="w-full" name="description">
                            <UTextarea v-model="stateOrg.description" />
                        </UFormGroup>
                        <UButton type="submit">
                            Добавить
                        </UButton>
                    </UForm>
                </template>
            </UTabs>
        </UCard>
    </UModal>
</template>
<script setup lang="ts">

const tabs = [{
    slot: 'individual',
    label: 'Физ. лицо'
}, {
    slot: 'organization',
    label: 'Организация'
}]
import { object, string, date, number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const customerStore = useCustomerStore()
const dayjs = useDayjs()
const router = useRoute()

const schemaIndividual = object({

    surname: string().required("Обязательное поле"),
    name: string().required("Обязательное поле"),
    second_name: string().required("Обязательное поле"),
    phone: string().required("Обязательное поле"),
});
type SchemaIndividual = InferType<typeof schemaIndividual>;

const stateIndividual = reactive({
    surname: undefined,
    name: undefined,
    second_name: undefined,
    phone: undefined,
    type: "individual",
    description: undefined,
    creadted_at: dayjs().format("DD MM YYYY HH:mm"),
    auth: undefined
});

async function onSubmit(event: FormSubmitEvent<SchemaIndividual>) {
    customerStore.addCustomer(event.data)
}
const schemaOrg = object({

    inn: string().required("Обязательное поле"),
    label: string().required("Обязательное поле"),
    contact: string().required("Обязательное поле"),
    phone: string().required("Обязательное поле"),
});
type SchemaOrg = InferType<typeof schemaOrg>;

const stateOrg = reactive({
    label: undefined,
    inn: undefined,
    contact: undefined,
    type: "organization",
    phone: undefined,
    description: undefined,
    email: undefined,
    address: undefined,
    creadted_at: dayjs().format("DD MM YYYY HH:mm"),
    auth: undefined
});

async function onSubmitOrg(event: FormSubmitEvent<SchemaOrg>) {
    customerStore.addCustomer(event.data)
}

const fill_by_inn = async () => {
    var inn = stateOrg.inn;
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
        stateOrg.label = r.suggestions[0].value
        stateOrg.address = r.suggestions[0].data.address.value
    })

}


onMounted(() => {
    customerStore.fetchCustomer()
})


</script>