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
                        Новый заказ
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="modal.close" />
                </div>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <div class="grid grid-cols-2 max-md:grid-cols-1 gap-4">

                    <UFormGroup label="Клиент" class="w-full" name="customer">
                        <div class="flex gap-4 w-full">
                            <USelectMenu searchable v-model="state.customer" class="w-full" :options="customers">
                            </USelectMenu>
                            <UButton label="+" color="gray" @click="customerStore.isOpen=true" />
                        </div>
                    </UFormGroup>


                </div>
                <UButton type="submit">
                    Добавить
                </UButton>
            </UForm>
        </UCard>
        <ModalCustomer v-model="customerStore.isOpen"/>
    </UModal>
</template>
<script setup lang="ts">
import { object, string, date, number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const customerStore = useCustomerStore()
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
    customer: undefined,
    unit: undefined,
    volume: undefined,
    date: dayjs().format("DD MM YYYY HH:mm")
});

const customers = ref([])
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    jobStore.addJob(event.data, router.params)
    modal.close()
}

const addClient = (q) => {
    console.log("Hello world")
}

</script>