import { create } from "zustand";
import { persist } from "zustand/middleware";
import { pathToPlaceholder } from "@/lib/utils.ts";
import { Placeholder } from "@/types";

type PlaceholderForInsert = {
  code: string,
  placeholder: Placeholder
}

interface PlaceholdersStore {
  selectedPlaceholders: Placeholder[];
  selectPlaceholder: (placeholder: Placeholder) => void;
  deselectPlaceholder: (placeholder: Placeholder) => void;
  setSelectedPlaceholders: (placeholders: Placeholder[]) => void;
  filteredPlaceholders: (filter: string) => Placeholder[];
  placeholderForInsert: PlaceholderForInsert | null;
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
      setSelectedPlaceholders: (placeholders: Placeholder[]) => set((state) => {
        if (JSON.stringify(state.selectedPlaceholders) !== JSON.stringify(placeholders)) {
          return { selectedPlaceholders: placeholders };
        }
        return state;
      }),
      filteredPlaceholders: (filter: string) => {
        const state = get();
        return state.selectedPlaceholders.filter(p =>
          p.hrid.toLowerCase().includes(filter.toLowerCase()) ||
          p.description?.toLowerCase().includes(filter.toLowerCase())
        );
      },
      placeholderForInsert: null,
      insertPlaceholder: (placeholder: Placeholder) => set(() => ({
        placeholderForInsert: { code: pathToPlaceholder(placeholder), placeholder }
      })),
      clearInsertPlaceholder: () => set(() => ({
        placeholderForInsert: null
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
