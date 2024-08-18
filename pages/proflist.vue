<template>
    <Navbar :links="[{ label: 'Главная', to: '/' }, { label: 'Профнастил' }]">
        <template #header>
            <div>
                <UButton @click=" modal.open(ModalOrder);" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }">
                </UButton>
            </div>
        </template>
    </Navbar>

</template>
<script setup lang='ts'>
import { ModalOrder } from '#components';
const modal = useModal()
</script>