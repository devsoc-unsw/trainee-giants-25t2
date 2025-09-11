// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user.types";

interface LoginRequiredProps {
  buttonText: string;
  buttonClassName: string;
  user: User | undefined;
  likes?: string[];
  dislikes?: string[];
}

export function LoginRequiredModal({ buttonText, buttonClassName, /*user,*/ likes, dislikes } : LoginRequiredProps) {
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // if (user) {
    //   navigate("/create-event", { state: { likes, dislikes }});
    // } else {
    //   setIsOpen(true);
    // }
    navigate("/create-event", { state: { likes, dislikes }});
  };

  // const redirectToLogin = () => {
  //   navigate("/login");
  // }

  return (
    <div>
      {/* Button */}
      <div
        onClick={handleClick}
        className={`${buttonClassName}`}
      >
        {buttonText}
      </div>
    </div>
  );
}

// {/* Modal */}
// {isOpen && (
//   // fix styling later
//   <div className="fixed inset-0 z-50 flex items-center justify-center">
//     {/* Backdrop */}
//     <div
//       onClick={() => setIsOpen(false)}
//       className="absolute inset-0 bg-black/50"
//     />

//     {/* Text */}
//     <div className="relative bg-white rounded-lg shadow-xl w-[min(90vw,400px)] p-6">
//       <h3 className="text-gray-900 text-xl font-bold mb-4">Login Required</h3>
//       <p className="text-gray-700 mb-6">
//         You must be logged in to use this feature.
//       </p>
//       <div className="flex justify-center gap-3">
//         <div
//           onClick={redirectToLogin}
//           className="px-4 py-2 rounded-md bg-[#E98657] text-white hover:bg-orange-500 font-semibold focus:outline-none"
//         >
//           Log in
//         </div>
//         <div
//           onClick={() => setIsOpen(false)}
//           className="bg-gray-700 px-4 py-2 rounded-md font-semibold border border-gray-300 hover:bg-gray-900 focus:outline-none"
//         >
//           Maybe later
//         </div>
//       </div>
//     </div>
//   </div>
// )}