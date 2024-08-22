<template>
    <UContainer>
        <UTabs :items="items">
            <template #order>
                <UInput v-model="q" placeholder="Поиск заказа"></UInput>
                <UDivider size="xl" class="mt-4" />

                <div v-for="item in searchOrder" class="mt-4">

                    <UCard class="mb-4">
                        <template #header>
                            <div class="flex justify-between">
                                <span class="font-medium">Заказ № <UBadge>{{ item.order_id }}</UBadge></span>
                                <span class="font-medium">Статус заказа: <UBadge>{{ item.status }}</UBadge></span>
                            </div>
                        </template>
                        <div class="space-y-4">
                            <span class="font-medium justify-between w-full flex">
                                <div>Заказчик:</div>
                                <UBadge color="gray">{{ item.customer }}</UBadge>
                            </span>
                            <span class="font-medium justify-between w-full flex">
                                <div>Номер телефона:</div>
                                <UBadge color="gray">{{ item.customer }}</UBadge>
                            </span>
                            <span class="font-medium justify-between w-full flex">
                                <div>Адрес доставки:</div>
                                <UBadge color="gray">{{ item.address }}</UBadge>
                            </span>
                            <UTable :columns="columns" :rows="item.bucket" />
                            <UButton @click="orderStore.acceptOrder(item.order_id, 'В работе')" size="xl"
                                v-if="item.status === 'Получен'" label="ПРИНЯТЬ" />
                            <UButton @click="orderStore.acceptOrder(item.order_id, 'Готово')" size="xl"
                                v-if="item.status === 'В работе'" label="ГОТОВО" />
                            <UButton @click="orderStore.acceptOrder(item.order_id, 'Готово')" size="xl"
                                v-if="item.status === 'Готово'" label="В архив" />

                        </div>

                    </UCard>
                    <UDivider size="xl" />
                </div>
            </template>
            <template #archive>

            </template>
        </UTabs>
    </UContainer>
</template>
<script setup lang="ts">
const q = ref("")

const searchOrder = computed(() => {
    if (!q.value) {
        return orderStore.orders;
    }
    console.log("Hello")
    return orderStore.orders.filter(person => {
        return Object.values(person).some(value => {
            return String(value).toLowerCase().includes(q.value.toLowerCase());
        });
    });
});

const items = [
    {
        label: "Заказы",
        slot: 'order'
    },
    {
        label: "Архив",
        slot: 'archive'
    }
]

const columns = [{
    key: 'id',
    label: "#"
},
{
    key: "material",
    label: "Материал"
},
{
    key: "thickness",
    label: "Толщина"
},
{
    key: "color",
    label: "Цвет"
},
{
    key: "length",
    label: "Длина, мм"
},
{
    key: "count",
    label: "Кол-во"
},
{
    key: "price",
    label: "Цена"
},
{
    key: "total",
    label: "Сумма"
},
]
const orderStore = useOrderStore()
definePageMeta({
    layout: false
})
onMounted(async () => {
    const r = await orderStore.fetchOrder()
})
</script>