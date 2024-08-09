<template>
    <Navbar
        :links="[{ icon: 'i-heroicons-arrow-left', to: `/objects/${router.params.id}` }, { label: router.params.name_work }]">
        <template #header>
            <UButton @click="modal.open(IspDocJobModal)" icon="i-heroicons-plus" :ui="{ rounded: 'rounded-full' }"/>
        </template>
    </Navbar>
    <div>
    </div>
    <IspDocUnitModal/>
    <IspDocJobModal/>
</template>
<script setup lang="ts">
import { IspDocJobModal } from '#components';
const modal = useModal()
const unitStore = useUnitStore()
const router = useRoute()

</script>