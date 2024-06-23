import Context from "@/features/context.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import HtmlEditor from "@/features/editor.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

const queryClient = new QueryClient()
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-row overflow-hidden h-screen ">
        <div className="w-3/4">
          <HtmlEditor/>
        </div>
        <div style={{
          backgroundColor: 'hsl(var(--secondary))'
        }} className="w-1/4 h-full overflow-hidden border-solid px-2 ">
          <Context/>
        </div>
      </div>
    </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
