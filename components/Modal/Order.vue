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
                            <USelectMenu searchable v-model="state.customer" class="w-full"
                                :options="customerStore.customers" />

                            <UButton label="+" color="gray" @click="customerStore.isOpen = true" />
                        </div>
                    </UFormGroup>
                    <UFormGroup label="Адрес доставки">
                        <VueDadata class="p-0" v-model="state.address" token="20defa76b6273253c20e0213cb383ddfe51c60aa"/>
                        
                    </UFormGroup>


                </div>
                <UButton type="submit">
                    Добавить
                </UButton>
            </UForm>
        </UCard>
        <ModalCustomer v-model="customerStore.isOpen" />
    </UModal>
</template>
<script setup lang="ts">
import { VueDadata } from 'vue-dadata';
import 'vue-dadata/dist/style.css';
import { object, string, date, number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const customerStore = useCustomerStore()
const modal = useModal()
const query = ref()
const dayjs = useDayjs()
const router = useRoute()
const schema = object({
    customer: object().required(),
});
type Schema = InferType<typeof schema>;

const state = reactive({
    customer: undefined,
    address:undefined
});

const customers = ref([])
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    modal.close()
}

const addClient = (q) => {
    console.log("Hello world")
}

</script>