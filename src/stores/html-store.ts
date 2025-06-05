import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HtmlStore {
  code: string,
  setCode: (code: string) => void,
  idForTest: string,
  setIdForTest: (id: string) => void
}

const useHtmlStore = create<HtmlStore>(
  persist(
    set => ({
      code: '',
      setCode: (code: string) => set({ code }),
      idForTest: '',
      setIdForTest: (id: string) => set({ idForTest: id })
    }),
    { name: 'html' }
  )
)
export default useHtmlStore
