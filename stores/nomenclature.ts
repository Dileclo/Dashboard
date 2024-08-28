import { defineStore } from "pinia";

export const useNomenclatureStore = defineStore("nomenclature", () => {
  const nomenclature = ref([]);
  const toast = useToast();
  const isOpen = ref(false);
  const types = [
    "Металлопрокат","Крепеж","Фасонные элементы" 
  ]
  const fetchNomenclature = async () => {
    const res = await fetch("/api/nomenclature/fetch");
    const resp = await res.json();
    nomenclature.value = resp.o;
  }

  const addNomenclature = async (data) => {
    const res = await fetch("/api/nomenclature/add", { method: "POST", body: JSON.stringify(data) });
    await fetchNomenclature();
  }

  return {
   nomenclature, isOpen, fetchNomenclature, addNomenclature,types
  };
});
