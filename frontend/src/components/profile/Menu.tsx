import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const capital = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

interface UserMenuProps {
  name: string;
  onLogout: () => void;
  bgColor?: string;
}

export function UserMenu({ name, onLogout, bgColor = "bg-white/20 hover:bg-white/30" }: UserMenuProps) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (open && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setOpen((s) => !s)}
        className={`${bgColor} px-3 py-2 rounded-md font-medium transition-all backdrop-blur-sm border border-white/30 cursor-pointer text-md`}
      >
        {capital(name)}
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-md bg-white text-black shadow-lg border border-black/20 z-50">
          <h4 className="flex flex-row items-end text-md px-3 py-2 font-semibold">
            {capital(name)}
          </h4>
          <div
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setOpen(false);
              navigate("/events");
            }}
          >
            Events
          </div>
          <div
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
