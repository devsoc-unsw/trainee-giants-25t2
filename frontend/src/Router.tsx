import { useEffect, type ReactNode } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { EventCreate } from "./pages/EventCreate";
import { EventAvailability } from "./pages/EventAvailability";
import { Events } from "./pages/Events";
import { Login } from "./pages/Login";
import { EventVote } from "./pages/EventVote";
import EventResultsPage from "./pages/EventResultsPage";

import { useUser } from "./hooks/useAuth";
import { getCookieUUID } from "./cookie/cookie";

const ProtectedRoute: React.FC<{children?: ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const { data: user } = useUser();
  if (!user) navigate("/");

  // Render the children (protected content) if authenticated
  return children;
};

const EventProtectedRoute: React.FC<{children?: ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const { eid } = useParams<{ eid: string }>();
  const { data: user, isLoading } = useUser();

  console.log(user);
  console.log(getCookieUUID());

  useEffect(() => {
    if (isLoading) return;
    if (!user && !getCookieUUID()) {
      navigate(`/event/${eid}/vote`);
    }
  }, [user, eid, navigate, isLoading]);

  if (!user && !getCookieUUID()) {
    return;
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
        <Route path="/create-event" element={<EventCreate />}/>
        <Route path="/event/:eid" element={<EventAvailability />}/>
        <Route path="/event/:eid/vote" element={<EventVote />}/>
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>}/>
        <Route path="/event/:eid/availability" element={<EventProtectedRoute><EventAvailability /></EventProtectedRoute>} />
        <Route path="/event/:eid/results" element={<EventProtectedRoute><EventResultsPage /></EventProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
