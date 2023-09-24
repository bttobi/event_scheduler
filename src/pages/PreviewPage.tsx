import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { M16 } from '../components/UI/M16_a2_rifle';

const PreviewPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="align-center mt-12 flex h-full flex-col items-center justify-center"
      >
        <p className="text-center text-3xl">
          WITAMY NA STRONIE NASZEJ STRZELNICY!
        </p>
        <div style={{ width: '50vw', height: '40vh' }} className="cursor-move">
          <Canvas>
            <OrbitControls />
            <ambientLight />
            <pointLight intensity={2000} position={[5, 5, 5]} />
            <M16 />
          </Canvas>
          <NavLink to="zaloguj">
            <p className="mt-6 text-center text-2xl underline">
              Musisz się zalogować, aby złożyć rezerwację!
            </p>
          </NavLink>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewPage;
