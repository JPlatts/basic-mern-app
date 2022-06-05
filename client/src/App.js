
import './App.css';
import 'bulma/css/bulma.min.css'
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route } from 'react-router-dom';
import Nav from './app/Nav';
import Home from './app/Home';
import About from './app/About';
import LogIn from './features/auth/LogIn';
import Register from './features/auth/Register';
import Deciders from './features/deciders/Deciders';
import ResetPw from './features/auth/ResetPw';
import { ToastContainer} from 'react-toastify'
import AccountConfirmation from './features/auth/AccountConfirmation';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/resetpw" element={<ResetPw />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deciders" element={<Deciders />} />
      </Routes>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Copyright © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      <ToastContainer />
      <AccountConfirmation />
    </div>
  );
}

export default App;
