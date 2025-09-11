import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { EventCreate } from "./pages/EventCreate";
import { Event } from "./pages/Event";
import { Events } from "./pages/Events";
import { Login } from "./pages/Login";
import { Availability } from "./pages/EventTimeAvailability";

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
        <Route path="/register" element={<Register />}/>
        <Route path="/create-event" element={<ProtectedRoute><EventCreate /></ProtectedRoute>}/>
        <Route path="/event/:eid" element={<Event />}/>
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        {/* For testing */}
        <Route path="/availability" element={<Availability />} />
      </Routes>
    </>
  );
};
