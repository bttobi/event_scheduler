import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/UI/Navbar";
import BookedDates from "./pages/BookedDates";
import { createContext } from "react";
import { auth } from "./firebase.js";
import { AlertProvider } from "./contexts/AlertProvider.js";
import Alert from "./components/UI/Alert.js";

export const UserContext = createContext(auth);

const App: React.FC = () => {
  return (
    <UserContext.Provider value={auth}>
      <AlertProvider>
        <main className="relative font-article">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/zaloguj" element={<Login />} />
              <Route path="/zarejestruj" element={<Register />} />
              <Route path="/terminy" element={<BookedDates />} />
            </Routes>
          </BrowserRouter>
          <Alert />
        </main>
      </AlertProvider>
    </UserContext.Provider>
  );
};

export default App;
