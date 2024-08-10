<template>
    <UModal fullscreen @close="modal.close" prevent-close>
        <UCard :ui="{
            base: 'h-full flex flex-col',
            rounded: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            body: { base: 'grow' }
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Добавить работу
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="modal.close" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Наименование" name="name_object">
                    <div class="flex gap-4">
                        <UInput v-model="state.name_job" class="w-full" />
                    </div>
                </UFormGroup>
                <UFormGroup label="Ед.изм" name="name_object">
                    <div class="flex gap-4">
                        <USelectMenu :options="unitStore.units" v-model="state.unit" class="w-full" searchable />
                        <UButton label="+" color="gray" @click="unitStore.isOpen = true" />
                    </div>
                </UFormGroup>
                <UFormGroup label="Объем" name="volume">
                    <div class="flex gap-4">
                        <UInput v-model="state.volume" class="w-full" />
                    </div>
                </UFormGroup>
                <UButton type="submit">
                    Добавить
                </UButton>
            </UForm>
        </UCard>
        <IspDocUnitModal v-model="unitStore.isOpen" />
    </UModal>
</template>
<script setup lang="ts">
import { object, string, date, number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const unitStore = useUnitStore()
const jobStore = useJobStore()
const modal = useModal()
const dayjs = useDayjs()
const router = useRoute()
const schema = object({
    name_job: string().required("Обязательное поле"),
    unit: object().required("Обязтаельнео поле"),
    volume: number().required("Обязательное поле")
});
type Schema = InferType<typeof schema>;

const state = reactive({
    name_job: undefined,
    unit: undefined,
    volume: undefined,
    date: dayjs().format("DD MM YYYY HH:mm")
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    jobStore.addJob(event.data,router.params)
    modal.close()
}

onMounted(() => {
    console.log("MODAL",router.params)
    unitStore.fetchUnit()
})

</script>