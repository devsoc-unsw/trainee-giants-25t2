import { useNavigate } from "react-router-dom";

interface RegisterButtonProps {
  bgColor?: string; 
}

export function RegisterButton({ bgColor = "bg-white/20 hover:bg-white/30" }: RegisterButtonProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`${bgColor} hover:bg-white/30 px-3 py-2 rounded-md font-medium transition-all duration-300 ease-in-out backdrop-blur-sm border border-white/30 cursor-pointer text-md`}
      onClick={() => navigate("/register")}
    >
      Register
    </div>
  );
}