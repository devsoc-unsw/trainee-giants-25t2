import { motion } from "framer-motion";
import { useState } from "react";

const EventVoteHeader = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    });
  };
  
  return (
    <div className="text-center">
      <div className="flex flex-row items-center justify-between w-ful pt-3">
        <h2 className="text-4xl font-bold text-black/75 transition-transform duration-300 flex-1 text-center">
          Vote 
        </h2>
        <div 
          onClick={handleCopyLink}
          className="px-3 py-2 bg-[#E98657] text-white font-medium rounded-md text-sm hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
        >
          {copied ? "Copied!" : "Copy link"}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ x: [ -40, 0 ], opacity: [ 1, 1, 0 ] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="text-gray-600 font-medium pt-3"
      >
        Swipe right to add to your list, left to pass
      </motion.p>
    </div>
  );
}

export default EventVoteHeader;
