import { useNavigate } from 'react-router-dom';
import { useLogout, useUser } from '../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';

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
    <div>
      <div className="bg-gradient-to-r from-[#F4975C] to-[#999999] w-full h-[65px] px-20">
        <div className="flex flex-row justify-between items-center text-white text-[8px]">
          <div className="flex flex-row gap-[200px] mt-4 ">
            <h1 className="flex text-md font-semibold">When2Eat</h1>
          </div>
          <div className="flex flex-row gap-[100px] mt-4 ">
            <h1 className="flex text-md font-semibold">Create an event</h1>

            {!user ? (
              <h1
                className="text-md font-semibold hover:text-gray-200 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </h1>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  className="text-md font-semibold hover:text-gray-200 cursor-pointer"
                  onClick={() => setOpen((s) => !s)}>

                  {user.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                  </svg>

                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white text-black shadow-lg z-50">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={async () => {
                        setOpen(false);
                        await doLogout();
                      }}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
