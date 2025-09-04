import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { EventsPage } from "./pages/Events";
import { Login } from "./pages/Login";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/create-event" element={<EventsPage/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
