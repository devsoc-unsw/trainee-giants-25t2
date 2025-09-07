import { motion } from "framer-motion";

interface CreateButtonProps {
  disabled: boolean;
  onClick?: () => void;
}

export const CreateButton: React.FC<CreateButtonProps> = ({ disabled, onClick }) => (
  <motion.button
    disabled={disabled}
    whileHover={disabled ? {} : { scale: 1.05 }}
    whileTap={disabled ? {} : { scale: 0.95 }}
    className={`w-full py-3 rounded-md font-bold text-white ${
      disabled ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
    }`}
    onClick={onClick}
  >
    Create event
  </motion.button>
);
