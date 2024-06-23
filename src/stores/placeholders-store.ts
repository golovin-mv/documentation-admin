import {Placeholder} from "@/api/placeholder-api.ts";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

interface PlaceholdersStore {
  selectedPlaceholders: Placeholder[],
  selectPlaceholder: (placeholder: Placeholder) => void;
  deselectPlaceholder: (placeholder: Placeholder) => void;
  filteredPlaceholders: (filter: string) => Placeholder[];
  placeholderForInsert: string;
  insertPlaceholder: (placeholder: Placeholder) => void;
  clearInsertPlaceholder: () => void;
  context: string,
  setContext: (context: string) => void,
  parsedContext: string,
  enableContext: boolean,
  setEnableContext: (enableContext: boolean) => void
}

const pathToPlaceholder = (placeholder: Placeholder) => {
  if (placeholder.formatMask) {
    return placeholder.formatMask
  }

  const paths = placeholder.path.split('.');

  const arrayPath = paths.slice(1).reduce((acc, path) => {
    acc += path === 'fields'
      ? "['fields'][0]"
      : `['${path}']`
    return acc
  }, '')

  return `{{$${paths[0]}${arrayPath}}}`;
}

const usePlaceholdersStore = create<PlaceholdersStore>(
  persist(
    devtools(
      (set) => ({
        selectedPlaceholders: [],
        selectPlaceholder: (placeholder: Placeholder) => set(state => ({
          selectedPlaceholders: [...state.selectedPlaceholders, placeholder]
        })),
        deselectPlaceholder: (placeholder: Placeholder) => set(state => ({
          selectedPlaceholders: state.selectedPlaceholders.filter(p => p.hrid !== placeholder.hrid)
        })),
        placeholderForInsert: '',
        insertPlaceholder: (placeholder: Placeholder) => set(() => ({
          placeholderForInsert: pathToPlaceholder(placeholder)
        })),
        clearInsertPlaceholder: () => set(() => ({
          placeholderForInsert: ''
        })),
        context: '',
        setEnableContext: (enableContext: boolean) => set(() => ({enableContext})),
        setContext: (context: string) => set(() => {
          try {
            JSON.parse(context);
            return ({context, parsedContext: context})
          } catch (err) {
            return ({parsedContext: '', context})
          }
        }),
        parsedContext: '{}',
        enableContext: true,
      })
    ), {
      name: 'placeholders',
    }
  )
);

export default usePlaceholdersStore
