import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/UI/Navbar';
import BookedDates from './pages/BookedDates';
import { AlertProvider } from './contexts/AlertContext.js';
import Alert from './components/UI/Alert.js';
import { UserContextProvider } from './contexts/UserContext.js';
import Contact from './pages/Contact.js';
import DeleteReservation from './pages/DeleteReservation.js';
import BlockDate from './pages/BlockDate.js';
import Profile from './pages/Profile.js';

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <AlertProvider>
        <main className="align-center relative flex flex-col items-center justify-center font-article">
          <HashRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/zaloguj" element={<Login />} />
              <Route path="/zarejestruj" element={<Register />} />
              <Route path="/terminy" element={<BookedDates />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/usun-rezerwacje" element={<DeleteReservation />} />
              <Route path="/zablokuj-date" element={<BlockDate />} />
              <Route path="/profil" element={<Profile />} />
            </Routes>
          </HashRouter>
          <Alert />
        </main>
      </AlertProvider>
    </UserContextProvider>
  );
};

export default App;
