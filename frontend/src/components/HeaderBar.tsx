import { useNavigate } from "react-router-dom";

import { useLogout, useUser } from '../hooks/useAuth';
import { LoginRequiredModal } from './homepage/LoginRequiredModal';
import { RegisterButton } from './homepage/Button';
import { UserMenu } from './profile/Menu';

import logo from '../assets/when2eat.png';

export function HeaderBar() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const doLogout = useLogout();

  return (
    <header className="bg-gradient-to-r from-[#F4975C] to-[#999999] w-full relative overflow-visible z-40 px-3 py-2">
      <div className="h-full flex items-center justify-between text-white">
        <div className="flex flex-row items-center cursor-pointer gap-4" onClick={() => {
            navigate("/");
          }}>
          <img src={logo} className="w-10 h-10 mt-1" />
          <h1 className="text-3xl font-black text-white text-center">
            When2
            <span className="text-orange-500">Eat</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <LoginRequiredModal
            buttonText="Create an event"
            buttonClassName="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-md font-medium transition-all duration-300 ease-in-out backdrop-blur-sm border border-white/30 cursor-pointer text-md"
            user={user}
          />
          {!user ? (
            <RegisterButton />
          ) : (
            <UserMenu name={user.name} onLogout={doLogout} />
          )}
        </div>
      </div>
    </header>
  );
}
