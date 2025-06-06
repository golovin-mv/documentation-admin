import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Settings from "@/features/settings.tsx";
import Templates from "@/features/templates.tsx";
import CreateTemplate from "@/features/create-template.tsx";
import TopNavigation from "@/components/top-menu.tsx";
import EditTemplate from "./features/edit-template";

const queryClient = new QueryClient()

function App() {

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TopNavigation />
          <Routes>
            <Route path="settings" element={<Settings />} />
            <Route path="templates" element={<Templates />} />
            <Route path="create" element={<CreateTemplate />} />
            <Route path="edit/:id" element={<EditTemplate />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
