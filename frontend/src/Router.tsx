import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { EventsPage } from "./pages/Events";
import { Login } from "./pages/Login";

import type { ReactNode } from "react";
import { useUser } from "./hooks/useAuth";

const ProtectedRoute: React.FC<{children?: ReactNode}> = ({ children }) => {
  const { data: user } = useUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Render the children (protected content) if authenticated
  return children;
};

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/create-event" element={<ProtectedRoute><EventsPage/></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
