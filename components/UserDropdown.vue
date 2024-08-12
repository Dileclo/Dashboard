<template>
    <div class="w-full">
        <UDropdown class="w-full" :items="items" :popper="{ placement: 'bottom-start' }">
            <UButton class="w-full" color="white" :label="session?.user?.name" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>
    </div>
</template>
<script setup lang="ts">
const { signOut, data: session } = useAuth();

const items = [
    [{
        label: 'Profile',
        avatar: {
            src: 'https://avatars.githubusercontent.com/u/739984?v=4'
        }
    }], [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        shortcuts: ['E'],
        click: () => {
            console.log('Edit')
        }
    }, {
        label: 'Duplicate',
        icon: 'i-heroicons-document-duplicate-20-solid',
        shortcuts: ['D'],
        disabled: true
    }], [{
        label: 'Archive',
        icon: 'i-heroicons-archive-box-20-solid'
    }, {
        label: 'Move',
        icon: 'i-heroicons-arrow-right-circle-20-solid'
    }], [{
        label: 'Выйти',
        icon: 'i-heroicons-trash-20-solid',
        click:()=>{
            logout()
        }
    }]
]
const logout = async () => {
    try {
        await signOut({ callbackUrl: '/signin' }); // перенаправление на страницу логина после выхода
    } catch (error) {
        console.error('Logout failed', error);
    }
}
</script>