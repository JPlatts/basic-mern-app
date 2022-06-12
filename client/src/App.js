import 'bulma/css/bulma.min.css'
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route } from 'react-router-dom';
import Nav from './app/Nav';
import Home from './app/Home';
import About from './app/About';
import LogIn from './features/auth/LogIn';
import Register from './features/auth/Register';
import Deciders from './features/deciders/Deciders';
import ResetPw from './features/auth/ResetPw';
import Nextrains from './features/nextrains/Nextrains';
import { ToastContainer} from 'react-toastify'
import AccountConfirmation from './features/auth/AccountConfirmation';  

function App() {
  return (
    <div className="App" >
      <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/resetpw" element={<ResetPw />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deciders" element={<Deciders />} />
        <Route path="/nextrains" element={<Nextrains />} />
      </Routes>
      <AccountConfirmation />
      <ToastContainer />
      <footer className="footer">
        <div className="content has-text-centered mt-auto">
          <p>
            Copyright © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      </main>
    </div>
  );
}

export default App;
