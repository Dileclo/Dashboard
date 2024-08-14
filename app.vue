<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <UModals />
  <UNotifications />
</template>
<script setup lang="ts">
import { useSidebarStore } from "~/stores/sidebar"

const modal = useModal()
const sidebarStore = useSidebarStore();
const router = useRouter()
watch(
  () => router.currentRoute.value,
  () => {
    sidebarStore.close();
  }
);
</script>

<style>
body {
  touch-action: manipulation;
}
</style>
