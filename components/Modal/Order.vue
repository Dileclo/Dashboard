<template>
    <UModal @close="modal.close" prevent-close>
        <UCard :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: { base: 'grow' }
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Новый заказ
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="modal.close" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Номер заказа">
                    <UInput v-model="state.order_id" disabled />
                </UFormGroup>
                <UFormGroup label="Клиент" class="w-full" name="customer">
                    <div class="flex gap-4 w-full">
                        <USelectMenu searchable v-model="state.customer" class="w-full"
                            :options="customerStore.customers" />

                        <UButton label="+" color="gray" @click="customerStore.isOpen = true" />
                    </div>
                </UFormGroup>
                <UFormGroup label="Адрес доставки">
                    <VueDadata class="p-0" v-model="state.address" token="20defa76b6273253c20e0213cb383ddfe51c60aa" />

                </UFormGroup>
                <UDivider label="Добавление товара" size="sm" />
                <UFormGroup label="Наименование" name="name_object">
                    <div class="flex gap-4">
                        <USelectMenu option-attribute="title" @change="getRemains" :options="nomenclatureStore.nomenclature"
                            v-model="state.material" class="w-full" searchable />
                        <UButton label="+" color="gray" @click="nomenclatureStore.isOpen = true" />
                    </div>
                </UFormGroup>

                <UFormGroup label="Цвет" name="color">
                    <USelectMenu searchable v-model="state.color" @change="getRemains" :options="colors" />
                </UFormGroup>
                <div v-show="state.material && state.material.type == 'Металлопрокат'">
                    <UFormGroup label="Толщина" name="thickness">
                        <USelectMenu searchable @change="getRemains" v-model="state.thickness" :options="thickness" />
                    </UFormGroup>
                    <UFormGroup label="Длина, мм" name="length">
                        <UInput v-model="state.length" />
                    </UFormGroup>
                </div>
                <UFormGroup label="Количество" :description="state.remains_string" name="count">
                    <UInput v-model="state.count" />
                </UFormGroup>
                <UFormGroup label="Ед.изм" name="name_object">
                    <div class="flex gap-4">
                        <USelectMenu :options="unitStore.units" v-model="state.unit" class="w-full" searchable />
                        <UButton label="+" color="gray" @click="unitStore.isOpen = true" />
                    </div>
                </UFormGroup>
                <UFormGroup>
                    <UButton label="Добавить товар" @click="addToBucket" color="gray" />
                </UFormGroup>
                <UTable :columns="columns" :rows="bucket"></UTable>


                <UButton type="submit">
                    Создать заказ
                </UButton>
            </UForm>
        </UCard>
        <ModalCustomer v-model="customerStore.isOpen" />
        <IspDocUnitModal v-model="unitStore.isOpen" />
        <ModalMaterial v-model="materialStore.isOpen" />
        <ModalNomenclature v-model="nomenclatureStore.isOpen" />
    </UModal>
</template>
<script setup lang="ts">
import { colors, thickness } from '@/utils/colors'
import { VueDadata } from 'vue-dadata';
import 'vue-dadata/dist/style.css';
import { object, string, date, number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const materialStore = useMaterialStore()
const customerStore = useCustomerStore()
const orderStore = useOrderStore()
const nomenclatureStore = useNomenclatureStore()
const unitStore = useUnitStore()
const modal = useModal()
const dayjs = useDayjs()
const schema = object({
    customer: object().required("Обязательное поле"),
});
type Schema = InferType<typeof schema>;

const state = reactive({
    customer: undefined,
    address: undefined,
    order_id: await orderStore.get_order_id() + 1,
    created_at: dayjs().format("DD MM YYYY HH:mm"),
    unit: undefined,
    material: {},
    count: undefined,
    length: undefined,
    thickness: undefined,
    color: undefined,
    remains: '',
    remains_string: ''
});
const columns = [{
    key: 'id',
    label: "#"
}, {
    key: 'material',
    label: 'Наименование'
},
{
    key: 'color',
    label: 'Цвет'
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
const customers = ref([])
const bucket = ref([])
async function onSubmit(event: FormSubmitEvent<Schema>) {
    orderStore.addOrder({ ...event.data, bucket: bucket.value, status: "Получен" })
    modal.close()
}

const addToBucket = () => {
    let data
    if (state.material.type == "Металлопрокат") {
        data = {
            id: bucket.value.length + 1,
            material: state.material.title,
            unit: state.unit.label,
            count: state.count,
            price: state.material.price,
            thickness: state.thickness,
            color: state.color,
            total: Number(state.material.price) * Number(state.count) * (Number(state.length) / 1000),
            length: state.length,
            type: state.material.type
        }
    }
    if (state.material.type == "Крепеж") {
        data = {
            id: bucket.value.length + 1,
            material: state.material.title,
            unit: state.unit.label,
            count: state.count,
            price: state.material.price,
            thickness: state.thickness,
            color: state.color,
            total: Number(state.material.price) * Number(state.count),
            length: state.length,
            type: state.material.type
        }
    }

    console.log(data)
    bucket.value.push(data)
    state.material = undefined
    state.unit = undefined
    state.count = undefined
    state.length = undefined
    state.color = undefined
}

const getRemains = async () => {
    let rem, res
    if (state.material.type == "Металлопрокат") {
        rem = await orderStore.getRemains(state.material.title, state.color, state.thickness, state.material.type)
        res = await rem.json()
        state.remains = res.o
        state.remains_string = "Остаток на складе: " + state.remains + " мп."


    } else {
        rem = await orderStore.getRemains(state.material.title, state.color, state.thickness, state.material.type)
        res = await rem.json()
        state.remains = res.o
        state.remains_string = "Остаток на складе: " + state.remains + " шт."

    }
    console.log(res)
}

onMounted(async () => {
    await materialStore.fetchMaterial()
    await unitStore.fetchUnit()
    await nomenclatureStore.fetchNomenclature()
})

</script>