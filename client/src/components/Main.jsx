import { motion } from "framer-motion";

function Main({ children }) {
  return (
    <motion.main
      className="bg-gradient-to-b from-emerald-500 to-emerald-900 flex flex-col items-center justify-end border-2 border-emerald-700 w-[600px] min-h-[400px] h-[90vh] rounded-lg relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.main>
  );
}

export default Main;
