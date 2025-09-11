import { useNavigate } from "react-router-dom";

export function RegisterButton() {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md font-medium transition-all backdrop-blur-sm border border-white/30 cursor-pointer text-lg"
      onClick={() => navigate("/register")}
    >
      Register
    </div>
  );
}