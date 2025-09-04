import { useNavigate } from 'react-router-dom';
import { useLogout, useUser } from '../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';

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
        <div className="flex items-center gap-48">
          <h1 className="text-xl font-semibold">When2Eat</h1>
        </div>

        <div className="flex items-center gap-24">
          <h1 className="text-base md:text-lg font-semibold">Create an event</h1>

          {!user ? (
            <button
              className="text-base md:text-lg font-semibold text-white hover:text-gray-200"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(s => !s)}
                className="text-base md:text-lg font-semibold text-white hover:text-gray-200 px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur whitespace-nowrap"
              >
                {capital(user.name)}
              </button>

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
