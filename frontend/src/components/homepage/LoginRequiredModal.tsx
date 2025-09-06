import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginRequiredProps {
  buttonText: string;
  buttonClassName: string;
}

export function LoginRequiredModal({ buttonText, buttonClassName } : LoginRequiredProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  }

  return (
    <div>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
      >
        {buttonText}
      </button>

      {/* Modal */}
      {isOpen && (
        // fix styling later
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          {/* Text */}
          <div className="relative bg-white rounded-lg shadow-xl w-[min(90vw,400px)] p-6">
            <h3 className="text-gray-900 text-xl font-bold mb-4">Login Required</h3>
            <p className="text-gray-700 mb-6">
              You must be logged in to use this feature.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={redirectToLogin}
                className="px-4 py-2 rounded-md bg-[#E98657] text-white font-semibold"
              >
                Log in
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}