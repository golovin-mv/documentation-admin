import {create} from "zustand";
import {persist} from "zustand/middleware";
import {ThemeKeys} from "react-json-view";
import {Theme} from "@/components/theme-provider.tsx";

interface SettingStore {
  theme: string
  setTheme: (theme: Theme) => void
  documentGeneratorUrl: string,
  setDocumentGeneratorUrl: (url: string) => void,
  templateAccessUrl: string,
  setTemplateAccessUrl: (url: string) => void,
  fileConverterUrl: string,
  setFileConverterUrl: (url: string) => void,
  htmlEditorTheme: string,
  jsonEditorTheme: ThemeKeys
}

const useSettingStore = create<SettingStore>(
  persist(
    set => ({
      theme: 'light',
      setTheme: (theme: Theme) => set(() => {
        return theme === 'light'
          ? ({
            theme: 'light',
            htmlEditorTheme: 'default',
            jsonEditorTheme: 'bright:inverted'
          })
          :
          ({
            theme: 'dark',
            htmlEditorTheme: 'vs-dark',
            jsonEditorTheme: 'tomorrow'
          });
      }),
      documentGeneratorUrl: '',
      setDocumentGeneratorUrl: (url: string) => set({documentGeneratorUrl: url}),
      templateAccessUrl: '',
      setTemplateAccessUrl: (url: string) => set({templateAccessUrl: url}),
      fileConverterUrl: '',
      setFileConverterUrl: (url: string) => set({fileConverterUrl: url}),
      htmlEditorTheme: 'default',
      jsonEditorTheme: 'bright:inverted'
    }),
    {
      name: 'setting'
    }
  )
)

export default useSettingStore;
