<template>
    <div>
        <Navbar :label="router.params.id">
            <template #header></template>
        </Navbar>
    </div>
</template>
<script setup lang="ts">
const router = useRoute()
</script>