import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/UI/Navbar';
import BookedDates from './pages/BookedDates';
import { AlertProvider } from './contexts/AlertContext.js';
import Alert from './components/UI/Alert.js';
import { UserContextProvider } from './contexts/UserContext.js';

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
            </Routes>
          </HashRouter>
          <Alert />
        </main>
      </AlertProvider>
    </UserContextProvider>
  );
};

export default App;
