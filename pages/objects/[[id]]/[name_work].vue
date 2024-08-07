<template>
    <Navbar
        :links="[{ icon: 'i-heroicons-arrow-left', to: `/objects/${router.params.id}` }, { label: router.params.name_work }]">
        <template #header>
            <UButton @click=" modal.open(IspDocWorkModal);" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }"/>
        </template>
    </Navbar>
    <div>
    </div>
</template>
<script setup lang="ts">
const router = useRoute()
</script>