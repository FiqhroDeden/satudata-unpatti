import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Academic from "./pages/Academic";
import HR from "./pages/HR";
import Finance from "./pages/Finance";
import Library from "./pages/Library";
import StudentAffairs from "./pages/StudentAffairs";
import Analytics from "./pages/Analytics";
import ETL from "./pages/ETL";
import Reports from "./pages/Reports";
import StudentDetail from "./pages/StudentDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/library" element={<Library />} />
          <Route path="/student-affairs" element={<StudentAffairs />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/etl" element={<ETL />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/student/:id" element={<StudentDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
