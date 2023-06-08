import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/UI/Navbar";
import BookedDates from "./pages/BookedDates";
import { createContext } from "react";
import { auth } from "./firebase.js";

export const UserContext = createContext(auth);

const App: React.FC = () => {
  return (
    <UserContext.Provider value={auth}>
      <main className="font-article">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/zaloguj" element={<Login />} />
            <Route path="/zarejestruj" element={<Register />} />
            <Route path="/terminy" element={<BookedDates />} />
          </Routes>
        </BrowserRouter>
      </main>
    </UserContext.Provider>
  );
};

export default App;
