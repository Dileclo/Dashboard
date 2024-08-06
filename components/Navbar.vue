<template>
    <div class="flex items-center w-full border-b p-4 justify-between">
        <div class="md:hidden">
            <UIcon @click="sidebarStore.toggle" name="i-heroicons-bars-3" class="text-3xl " />
        </div>
        <UBreadcrumb divider="/" :links="links" />
        <slot name="header" />
    </div>
    <div class="flex gap-4 w-full items-center pl-4 pr-4 py-3 border-b">
        <slot name="second" />
    </div>
</template>
<script setup>
import { useSidebarStore } from "../stores/sidebar"
const sidebarStore = useSidebarStore()
defineProps({
    links: [],
})
</script>