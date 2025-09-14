import { motion } from "framer-motion";

interface InputButtonProps {
  disabled: boolean;
  submit: () => void;
}

export const InputButton: React.FC<InputButtonProps> = ({ disabled, submit }) => (
  <motion.button
    disabled={disabled}
    whileHover={disabled ? {} : { scale: 1.05 }}
    whileTap={disabled ? {} : { scale: 0.95 }}
    className={`w-full py-3 rounded-md font-bold text-white ${
      disabled ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
    }`}
    onClick={submit}
  >
    Continue
  </motion.button>
);
