<script lang="ts" setup>
import { object, string, date, number, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
const { signIn } = useAuth() // uses the default signIn function provided by nuxt-auth
const authStore = useAuthStore()
definePageMeta({
    title: 'Signin',
    layout: false,
    public: true,
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const items = [{
    slot: 'account',
    label: 'Авторизация'
}, {
    slot: 'register',
    label: 'Регистрация'
}]

const schemaLogin = object({
    email: string().required("Обязательное поле"),
    password: string().required("Обязательное поле"),
});
const schemaReg = object({
    email: string().required("Обязательное поле"),
    password: string().required("Обязательное поле"),
    username: string().required("Обязательное поле"),
});
type SchemaLogin = InferType<typeof schemaLogin>;
type SchemaReg = InferType<typeof schemaLogin>;

const stateLogin = reactive({
    email: undefined,
    password: undefined,
});
const stateReg = reactive({
    email: undefined,
    password: undefined,
    username: undefined,
});

async function onSubmitLogin(event: FormSubmitEvent<SchemaLogin>) {
    console.log(event.data)
    signIn('credentials',event.data)
}
async function onSubmitRegister(event: FormSubmitEvent<SchemaReg>) {
    authStore.register(event.data)
}

</script>

<template>
    <div class="flex flex-col items-center justify-center p-4   h-screen w-full">
        <UTabs :items="items" class="max-md:w-full md:w-1/3">
            <template #account="{ item }">
                <UCard class="">
                    <template #header>
                        <div class="font-medium">
                            Войти
                        </div>
                    </template>
                    <UForm :state="stateLogin" :schema="schemaLogin" class="space-y-4" @submit="onSubmitLogin">
                        <UFormGroup label="E-Mail">
                            <UInput v-model="stateLogin.email" type="email" placeholder="Введите email" />
                        </UFormGroup>
                        <UFormGroup label="Пароль">
                            <UInput v-model="stateLogin.password" type="password" placeholder="Введите пароль" />
                        </UFormGroup>
                        <UButton label="Войти" type="submit" color="gray" />
                        <UButton label="Войти с помощью GitHub" @click="signIn('github')" color="gray" />
                    </UForm>
                </UCard>
            </template>
            <template #register="{ item }">
                <UCard class="">
                    <template #header>
                        <div class="font-medium">
                            Зарегистрироваться
                        </div>
                    </template>
                    <UForm :state="stateReg" :schema="schemaReg" class="space-y-4" @submit="onSubmitRegister">
                        <UFormGroup label="E-Mail">
                            <UInput v-model="stateReg.email" type="email" placeholder="Введите email" />
                        </UFormGroup>
                        <UFormGroup label="Имя пользователя">
                            <UInput v-model="stateReg.username" type="username" placeholder="Введите имя пользователя" />
                        </UFormGroup>
                        <UFormGroup label="Пароль">
                            <UInput v-model="stateReg.password" type="password" placeholder="Введите пароль" />
                        </UFormGroup>
                        <UButton type="submit" label="Зарегистрироваться" color="gray" />
                    </UForm>
                </UCard>
            </template>
        </UTabs>
    </div>
</template>