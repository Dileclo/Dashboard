import { defineStore } from "pinia";

export const useWarehouseStore = defineStore("warehouse", () => {
  const warehouse = ref([]);
  const loading = ref(false);
  const toast = useToast();
  const isOpen = ref(false);

  const getWarehouse = async () => {
    loading.value = true;
    const response = await fetch("/api/warehouse/fetch");
    const data = await response.json();
    console.log(data)
    warehouse.value = data.o;
    loading.value = false;
  }

  const addWarehouse = async (w) => {
    loading.value = true;
    console.log(w)
    const r = await fetch("/api/warehouse/add", { method: "POST", body: JSON.stringify(w) });
    await getWarehouse();
    loading.value = false;

    toast.add({ title: "Успешно добавлено" });
  }

  return {
    warehouse,getWarehouse,addWarehouse,loading,isOpen
  };
});
