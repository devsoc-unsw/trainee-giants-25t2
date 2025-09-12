import { useNavigate } from "react-router-dom";

interface RegisterButtonProps {
  bgColor?: string; 
}

export function RegisterButton({ bgColor = "bg-white/20 hover:bg-white/30" }: RegisterButtonProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`${bgColor} hover:bg-white/30 px-4 py-2 rounded-md font-medium transition-all backdrop-blur-sm border border-white/30 cursor-pointer text-lg`}
      onClick={() => navigate("/register")}
    >
      Register
    </div>
  );
}