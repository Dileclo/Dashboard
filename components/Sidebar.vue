<template>
    <div class="max-md:hidden flex flex-col w-[250px] border-r h-screen p-4">
        <div class="w-full">
            <div class="flex justify-center mb-4">LOGO</div>
            <UInput icon="i-heroicons-magnifying-glass-20-solid" class="mb-4" size="sm" color="white" :trailing="false"
                placeholder="Поиск..." />
            <UVerticalNavigation :links="links" />
        </div>
        <div class="flex h-full w-full items-end">ger</div>
    </div>
    <div v-if="sidebarStore.isOpen" class="absolute flex-col top-0 left-0 w-full h-full bg-white z-[1000] ">
        <div class="flex w-full border-b mb-2 p-4 justify-between">
            <UIcon @click="sidebarStore.toggle" name="i-heroicons-bars-3" class="text-3xl" />
        </div>
        <div class="p-4">
            <UInput icon="i-heroicons-magnifying-glass-20-solid" class="mb-4" size="sm" color="white" :trailing="false"
                placeholder="Поиск..." />
            <UVerticalNavigation :links="links" />
        </div>
    </div>
</template>
<script setup>
import { useSidebarStore } from "../stores/sidebar"
const sidebarStore = useSidebarStore()
const links = [[
    {
        label: 'Главная',
        to: '/',
        icon: 'i-heroicons-home'
    }, {
        label: 'Сотрудники',
        to: '/users',
        icon: 'i-heroicons-users'
    }, {
        label: 'Календарь',
        to: '/calendar',
        icon: 'i-heroicons-calendar'
    }, {
        label: 'Исп. документация',
        to: '/ispdoc',
        icon: 'i-heroicons-document'
    },

], [{
    label: 'Плазменная резка',
    to: '/plazma',
    icon: 'i-heroicons-fire',
},
{
    label:'Склад',
    to: '/warehouse',
    icon:'i-heroicons-cube'
}
]]
</script>