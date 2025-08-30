import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
};
