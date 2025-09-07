import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { EventCreate } from "./pages/EventCreate";
import { Login } from "./pages/Login";
import { EventsPage } from "./pages/Events";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/create-event" element={<EventCreate />} />
        <Route path="/view-event" element={<EventsPage/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
