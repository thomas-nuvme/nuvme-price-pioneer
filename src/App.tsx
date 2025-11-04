
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PinProtection from "./pages/PinProtection";
import Welcome from "./pages/Welcome";
import MissoesModulos from "./pages/MissoesModulos";
import Planos from "./pages/Planos";
import Diagnosticos from "./pages/Diagnosticos";
import Calculadora from "./pages/Calculadora";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* PIN Protection */}
            <Route path="/pin" element={<PinProtection />} />
            <Route path="/welcome" element={<Welcome />} />
            
            {/* Protected Routes with Sidebar */}
            <Route path="/*" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <div className="flex-1 flex flex-col">
                      <header className="h-14 flex items-center border-b px-4 sticky top-0 bg-background z-10">
                        <SidebarTrigger />
                      </header>
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/missoes-modulos" element={<MissoesModulos />} />
                          <Route path="/planos" element={<Planos />} />
                          <Route path="/diagnosticos" element={<Diagnosticos />} />
                          <Route path="/calculadora" element={<Calculadora />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
