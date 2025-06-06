import { Placeholder } from "@/api/placeholder-api.ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { pathToPlaceholder } from "@/lib/utils.ts";

interface PlaceholdersStore {
  selectedPlaceholders: Placeholder[];
  selectPlaceholder: (placeholder: Placeholder) => void;
  deselectPlaceholder: (placeholder: Placeholder) => void;
  filteredPlaceholders: (filter: string) => Placeholder[];
  placeholderForInsert: string;
  insertPlaceholder: (placeholder: Placeholder) => void;
  clearInsertPlaceholder: () => void;
  context: string;
  setContext: (context: string) => void;
  parsedContext: string;
  enableContext: boolean;
  setEnableContext: (enableContext: boolean) => void;
}

const usePlaceholdersStore = create<PlaceholdersStore>()(
  persist(
    (set, get) => ({
      selectedPlaceholders: [],
      selectPlaceholder: (placeholder: Placeholder) => set((state) => ({
        selectedPlaceholders: [...state.selectedPlaceholders, placeholder]
      })),
      deselectPlaceholder: (placeholder: Placeholder) => set((state) => ({
        selectedPlaceholders: state.selectedPlaceholders.filter(p => p.hrid !== placeholder.hrid)
      })),
      filteredPlaceholders: (filter: string) => {
        const state = get();
        return state.selectedPlaceholders.filter(p => 
          p.hrid.toLowerCase().includes(filter.toLowerCase()) || 
          p.description?.toLowerCase().includes(filter.toLowerCase())
        );
      },
      placeholderForInsert: '',
      insertPlaceholder: (placeholder: Placeholder) => set(() => ({
        placeholderForInsert: pathToPlaceholder(placeholder)
      })),
      clearInsertPlaceholder: () => set(() => ({
        placeholderForInsert: ''
      })),
      context: '',
      setEnableContext: (enableContext: boolean) => set(() => ({ enableContext })),
      setContext: (context: string) => set(() => {
        try {
          JSON.parse(context);
          return { context, parsedContext: context };
        } catch (err) {
          return { parsedContext: '', context };
        }
      }),
      parsedContext: '{}',
      enableContext: true,
    }), {
      name: 'placeholders',
    }
  )
);

export default usePlaceholdersStore;
