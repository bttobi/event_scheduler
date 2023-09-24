import { AnimatePresence, motion } from 'framer-motion';

const Contact = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-24 flex flex-col items-center justify-center"
      >
        <ul
          className="mt-32 w-96 rounded-lg p-8"
          style={{ background: '#0369a1' }}
        >
          <li>
            <span className="bold text-xl text-white">Adres: </span>
            <span>Ul. Testowa 420, Test, 00-000</span>
          </li>
          <li className="mt-4">
            <span className="bold text-xl text-white">Telefon: </span>
            <span>000-000-000</span>
          </li>
          <li className="mt-4">
            <span className="bold text-xl text-white">Email: </span>
            <span>test@test.pl</span>
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default Contact;
