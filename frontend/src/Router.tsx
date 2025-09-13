import type { ReactNode } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { EventCreate } from "./pages/EventCreate";
import { EventAvailability } from "./pages/EventAvailability";
import { Events } from "./pages/Events";
import { Login } from "./pages/Login";
import { EventVote } from "./pages/EventVote";

import { useUser } from "./hooks/useAuth";

const ProtectedRoute: React.FC<{children?: ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const { data: user } = useUser();
  if (!user) navigate("/");

  // Render the children (protected content) if authenticated
  return children;
};

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/create-event" element={<EventCreate />}/>
        <Route path="/event/:eid" element={<EventAvailability />}/>
        <Route path="/event/:eid/vote" element={<EventVote />}/>
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
