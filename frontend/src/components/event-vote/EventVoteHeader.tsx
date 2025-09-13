import { motion } from "framer-motion";

const EventVoteHeader = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-600 transition-transform duration-300 bg-b">
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
        className="text-white font-medium pt-3"
      >
        Swipe right to add to your list, left to pass
      </motion.p>
    </div>
  );
}

export default EventVoteHeader;