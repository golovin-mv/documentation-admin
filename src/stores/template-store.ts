import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Template } from "@/types/template";

interface TemplateStore {
  template: Template | null;
  setTemplate: (template: Template | null) => void;
  updateTemplate: (template: Partial<Template>) => void;
}

const convertDates = (template: Template): Template => ({
  ...template,
  startDate: new Date(template.startDate),
  endDate: new Date(template.endDate)
});

const useTemplateStore = create<TemplateStore>()(
  persist(
    (set) => ({
      template: null,
      setTemplate: (template: Template | null) => set(() => ({ 
        template: template ? convertDates(template) : null 
      })),
      updateTemplate: (template: Partial<Template>) => set((state) => ({
        template: state.template ? { 
          ...state.template, 
          ...template,
          startDate: template.startDate ? new Date(template.startDate) : state.template.startDate,
          endDate: template.endDate ? new Date(template.endDate) : state.template.endDate
        } : null
      })),
    }), {
    name: 'template',
  }
  )
);

export default useTemplateStore;
