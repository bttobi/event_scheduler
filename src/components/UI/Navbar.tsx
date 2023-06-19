import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { UserContext } from "../../App";
import { User } from "firebase/auth";
import { AlertContext } from "../../contexts/AlertContext";

export const Navbar: React.FC = () => {
  const hamburgerInputRef = useRef<HTMLInputElement>(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const { setAlert } = useContext(AlertContext);
  const auth = useContext(UserContext);

  const hideMenu = (e: Event) => {
    e.stopPropagation();
    if (e.target != hamburgerInputRef.current && hamburgerInputRef.current)
      setIsHamburgerOpen(false);

    if (
      e.target == hamburgerInputRef.current &&
      isHamburgerOpen &&
      hamburgerInputRef.current
    )
      hamburgerInputRef.current.checked = false;
  };

  const logOut = () => {
    signOut(auth);
    navigate("/zaloguj");
    setAlert("Wylogowano pomyślnie!", true, false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    document.body.addEventListener("click", (e) => hideMenu(e));
    return () => {
      document.body.removeEventListener("click", (e) => hideMenu(e));
      unsubscribe();
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="navbar bg-base-100 font-header"
      >
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn-ghost swap-rotate btn-circle btn lg:hidden"
          >
            <input
              onChange={() => {
                setIsHamburgerOpen(!isHamburgerOpen);
                if (hamburgerInputRef.current)
                  hamburgerInputRef.current.checked = !isHamburgerOpen;
              }}
              ref={hamburgerInputRef}
              type="checkbox"
              className="z-20 h-full w-full cursor-pointer opacity-0"
            />
            <AnimatePresence>
              {!isHamburgerOpen ? (
                <motion.svg
                  key={Math.random()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: 180 }}
                  exit={{ opacity: 0 }}
                  className="absolute fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </motion.svg>
              ) : (
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: 180 }}
                  exit={{ opacity: 0 }}
                  className="absolute fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </motion.svg>
              )}
            </AnimatePresence>
          </label>
          <AnimatePresence>
            {isHamburgerOpen && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setIsHamburgerOpen(false);
                  if (hamburgerInputRef.current)
                    hamburgerInputRef.current.checked = !isHamburgerOpen;
                }}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                {user?.email && (
                  <li>
                    <NavLink to="/">Umów się</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/zaloguj">Zaloguj</NavLink>
                </li>
                <li>
                  <NavLink to="/zarejestruj">Zarejestruj</NavLink>
                </li>
                {user?.email && (
                  <li>
                    <NavLink to="/terminy">Moje terminy</NavLink>
                  </li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <div className="navbar-start"></div>
        <div className="align-center navbar-center hidden w-1/2 items-center justify-center lg:flex">
          <ul className="menu menu-horizontal flex w-full justify-evenly px-1">
            {user?.email && (
              <li>
                <NavLink to="/">Umów się</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/zaloguj">Zaloguj</NavLink>
            </li>
            <li>
              <NavLink to="/zarejestruj">Zarejestruj</NavLink>
            </li>
            {user?.email && (
              <li>
                <NavLink to="/terminy">Moje terminy</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {user?.email && (
            <button
              className="btn-ghost btn text-xl normal-case"
              onClick={logOut}
            >
              Wyloguj
            </button>
          )}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;
