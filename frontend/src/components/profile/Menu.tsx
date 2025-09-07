import { useEffect, useRef, useState } from "react";

const capital = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export function UserMenu({ name, onLogout }: { name: string; onLogout: () => void }) {
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
        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md font-medium transition-all backdrop-blur-sm border border-white/30 cursor-pointer text-lg"
      >
        {capital(name)}
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-44 rounded-md bg-gradient-to-r from-[#F4975C] to-[#999999] text-white shadow-lg z-50">
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-white/20"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}