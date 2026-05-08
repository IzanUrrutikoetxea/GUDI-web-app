import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AgendaPage from "./pages/AgendaPage";
import BudgetsPage from "./pages/BudgetsPage";
import MessagesPage from "./pages/MessagesPage";
import MainLayout from "./layouts/MainLayout";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/agenda"
            element={
              <PrivateRoute>
                <MainLayout>
                  <AgendaPage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/presupuestos"
            element={
              <PrivateRoute>
                <MainLayout>
                  <BudgetsPage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/mensajeria"
            element={
              <PrivateRoute>
                <MainLayout>
                  <MessagesPage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
