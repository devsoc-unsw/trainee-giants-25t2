import { useNavigate } from 'react-router-dom';
import { useLogout, useUser } from '../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { LoginRequiredModal } from './homepage/LoginRequiredModal';

const capital = (s: string) => s ? s[0].toUpperCase() + s.slice(1) : s;

export function HeaderBar() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const doLogout = useLogout();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }

    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <header className="bg-gradient-to-r from-[#F4975C] to-[#999999] w-full h-[65px] px-20 relative overflow-visible z-40">
      <div className="h-full flex items-center justify-between text-white">
        <h1 className="text-2xl font-bold tracking-tight">When2Eat</h1>
        <div className="flex items-center gap-6">
          <LoginRequiredModal
            buttonText="Create an event"
            buttonClassName="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md font-medium transition-all backdrop-blur-sm border border-white/30 cursor-pointer text-lg"
          />
          {!user ? (
            <div
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md font-medium transition-all backdrop-blur-sm border border-white/30 cursor-pointer text-lg"
              onClick={() => navigate("/register")}
            >
              Register
            </div>
          ) : (
            <div className="relative" ref={menuRef}>
              <div
                onClick={() => setOpen(s => !s)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md font-medium transition-all backdrop-blur-sm border border-white/30 cursor-pointer text-lg"
              >
                {capital(user.name)}
              </div>

              {open && (
                <div className="absolute right-0 top-full mt-2 min-w-44 rounded-md bg-gradient-to-r from-[#F4975C] to-[#999999] text-white shadow-lg z-50">
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-white/20"
                    onClick={async () => {
                      setOpen(false);
                      await doLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
