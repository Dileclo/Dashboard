<template>
    <Navbar :links="[{ label: 'Профнастил', to: '/proflist' }, { label: 'Заказ № ' + router.params.id }]">
        <template #second>
            <UButton label="Печать заказа" color="gray"/>
        </template>

    </Navbar>
    <UForm :schema="schema" :state="state" class="space-y-4 p-5" @submit="onSubmit">
        <UFormGroup label="Номер заказа">
            <UInput v-model="state.order_id" disabled />
        </UFormGroup>
        <UFormGroup label="Клиент" class="w-full" name="customer">
            <div class="flex gap-4 w-full">
                <USelectMenu searchable v-model="state.customer" class="w-full" :options="customerStore.customers" />

                <UButton label="+" color="gray" @click="customerStore.isOpen = true" />
            </div>
        </UFormGroup>
        <UFormGroup label="Адрес доставки">
            <VueDadata class="p-0" v-model="state.address" token="20defa76b6273253c20e0213cb383ddfe51c60aa" />

        </UFormGroup>
    </UForm>
    <UTable :loading="orderStore.loading" :columns="columns" :rows="order_bucket"></UTable>
</template>
<script setup lang="ts">
import { VueDadata } from 'vue-dadata';
import 'vue-dadata/dist/style.css';
import { object, string, date, number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const orderStore = useOrderStore()
const customerStore = useCustomerStore()
const router = useRoute()
const order = ref([])
const order_bucket = ref([])
const dayjs = useDayjs()
const schema = object({
    customer: object().required("Обязательное поле"),
});
type Schema = InferType<typeof schema>;

const state = reactive({
    customer: order.value.customer,
    address: undefined,
    order_id: router.params.id,
    created_at: dayjs().format("DD MM YYYY HH:mm"),
    unit: undefined,
    material: undefined,
    count: undefined,
    length: undefined
});
const columns = [{
    key: 'id',
    label: "#"
}, {
    key: 'material',
    label: 'Наименование'
},
{
    key: 'length',
    label: 'Длина,мм'
},
{
    key: 'unit',
    label: 'Ед.изм'
},
{
    key: "price",
    label: 'Цена'
},
{
    key: 'count',
    label: 'Количество'
},
{
    key: 'total',
    label: "Итого"
}]
onMounted(async () => {
    const d = await orderStore.fetchOrderById(router.params.id)
    await customerStore.fetchCustomer()
    order.value = d.o
    order_bucket.value = d.o.bucket
    state.customer = order.value.customer
    state.address = order.value.address
})
</script>