
import './App.css';
import 'bulma/css/bulma.min.css'
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route, Link} from 'react-router-dom';
import Nav from './app/Nav';
import LogIn from './features/auth/LogIn';
import Register from './features/auth/Register';
import Deciders from './features/deciders/Deciders';
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

function About() {
  return (
    <>
      <main>
        <h2>About</h2>
        <p>About.</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  )
}
function Home() {
  let message = '';
  try {
    throw new Error("COWS ARE LYING")
  } catch (error) {
    console.log(JSON.stringify(error));
    message = JSON.stringify(error);
    /*
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      */
  }
  return (
    <>
      <div className='container'>
        <h1 className='title' >{message}</h1>
      </div>
     
    </>
  )
}

export default App;
