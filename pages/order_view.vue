<template>
    <UContainer>
        <div class="grid grid-cols-2 p-4 gap-4">
            <div v-for="item in orderStore.orders">
                <UCard>{{ item }}</UCard>
            </div>
            <div>PIDAR</div>
        </div>
    </UContainer>
</template>
<script setup lang="ts">
const orderStore = useOrderStore()
definePageMeta({
    layout: false
})
onMounted(async () => {
    const r = await orderStore.fetchOrder()
})
</script>