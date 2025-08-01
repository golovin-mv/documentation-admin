import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Template, mapApiTemplateToTemplate } from "@/types/template";
import { getTemplate } from "@/api/templates-api";
import { showTemplateLoadError } from "@/lib/toast-utils";

interface TemplateStore {
  template: Template | null;
  loadingStates: {
    loadTemplate: boolean;
  };
  errors: {
    loadTemplate: string | null;
  };
  setTemplate: (template: Template | null) => void;
  updateTemplate: (template: Partial<Template>) => void;
  loadTemplate: (id: string) => Promise<void>;
  clearLoadTemplateError: () => void;
}

const convertDates = (template: Template): Template => ({
  ...template,
  startDate: new Date(template.startDate),
  endDate: new Date(template.endDate)
});

const useTemplateStore = create<TemplateStore>()(persist(
  (set, get) => ({
    template: null,
    loadingStates: {
      loadTemplate: false,
    },
    errors: {
      loadTemplate: null,
    },
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
    loadTemplate: async (id: string) => {
      set((state) => ({ 
        loadingStates: { ...state.loadingStates, loadTemplate: true },
        errors: { ...state.errors, loadTemplate: null }
      }));
      try {
        const response = await getTemplate(id);
        if (response.error) {
          throw new Error(response.error);
        }
        const template = mapApiTemplateToTemplate(response.data);
        set((state) => ({ 
          template, 
          loadingStates: { ...state.loadingStates, loadTemplate: false },
          errors: { ...state.errors, loadTemplate: null }
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load template';
        
        // Show error toast
        showTemplateLoadError(errorMessage);
        
        set((state) => ({ 
          template: null, 
          loadingStates: { ...state.loadingStates, loadTemplate: false },
          errors: { ...state.errors, loadTemplate: errorMessage }
        }));
      }
    },
    clearLoadTemplateError: () => set((state) => ({ 
      errors: { ...state.errors, loadTemplate: null }
    })),
  }), {
  name: 'template',
  partialize: (state) => ({ template: state.template }), // Only persist template, not loading states
}));

export default useTemplateStore;
