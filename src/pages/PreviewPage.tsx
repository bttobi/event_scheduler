import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const PreviewPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-24 flex flex-col items-center justify-center"
      >
        <NavLink to="zaloguj">
          <p className="mt-12 text-2xl underline">
            Musisz się zalogować, aby złożyć rezerwację!
          </p>
        </NavLink>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewPage;
