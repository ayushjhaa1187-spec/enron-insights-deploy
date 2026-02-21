import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import BRDsPage from "./pages/BRDsPage";
import LiveBRD from "./pages/LiveBRD";
import MetricsPage from "./pages/MetricsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/upload" element={<DashboardLayout><UploadPage /></DashboardLayout>} />
          <Route path="/brds" element={<DashboardLayout><BRDsPage /></DashboardLayout>} />
          <Route path="/live-brd" element={<DashboardLayout><LiveBRD /></DashboardLayout>} />
          <Route path="/metrics" element={<DashboardLayout><MetricsPage /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
