import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Settings from "@/features/settings.tsx";
import Templates from "@/features/templates.tsx";
import CreateTemplate from "@/features/create-template.tsx";
import EditTemplate from "./features/edit-template";
import SideNav from "./components/side-nav";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

const queryClient = new QueryClient()

function App() {
  return (

    <ThemeProvider storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SidebarProvider>
            <SideNav />
            <main className="w-full">
              <SidebarTrigger className="fixed" />
              <Routes>
                <Route path="settings" element={<Settings />} />
                <Route path="templates" element={<Templates />} />
                <Route path="create" element={<CreateTemplate />} />
                <Route path="edit/:id" element={<EditTemplate />} />
              </Routes>
            </main>
          </SidebarProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
