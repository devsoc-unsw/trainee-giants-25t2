import { useNavigate } from "react-router-dom";

import { useLogout, useUser } from '../hooks/useAuth';
import { LoginRequiredModal } from './homepage/LoginRequiredModal';
import { RegisterButton } from './homepage/Button';
import { UserMenu } from './profile/Menu';


export function HeaderBar() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const doLogout = useLogout();

  return (
    <header className="bg-gradient-to-r from-[#F4975C] to-[#999999] w-full h-[65px] px-20 relative overflow-visible z-40">
      <div className="h-full flex items-center justify-between text-white">
        <h1 className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => {
          navigate("/");
          window.location.reload();
        }}>When2Eat</h1>
        <div className="flex items-center gap-6">
          <LoginRequiredModal
            buttonText="Create an event"
            buttonClassName="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md font-medium transition-all backdrop-blur-sm border border-white/30 cursor-pointer text-lg"
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
