import { motion } from "framer-motion";

const EventVoteHeader = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-black/75 transition-transform duration-300">
        Vote 
      </h2>
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