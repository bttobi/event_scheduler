import { AnimatePresence, motion } from "framer-motion";

const BookedDates = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-12 flex h-full w-full flex-col items-center justify-center"
      >
        <div className="text-2xl">Moje terminy (ostatnie 30 dni):</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookedDates;
