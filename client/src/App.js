
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from 'react-router-dom';
import Nav from './components/Nav';
import LogIn from './routes/LogIn';
import Register from './routes/Register';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn vice="citys" />} />
        <Route path="/register" element={<Register />} />
      </Routes>
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
  return (
    <>
      <main>
        <h2>Home</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  )
}

export default App;
