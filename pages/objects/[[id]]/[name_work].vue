<template>
    <Navbar :links="[{ icon: 'i-heroicons-arrow-left',to:`/objects/${router.params.id}` }, { label: router.params.name_work }]">
        <template #header> <div></div> </template>
    </Navbar>
    <div>
        {{ router.params }}
    </div>
</template>
<script setup lang="ts">
const router = useRoute()
</script>