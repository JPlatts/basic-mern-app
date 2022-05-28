import NaviLink from './NaviLink';
import LoginButton from './LoginButton';
const React = require('react');
const { Link } = require('react-router-dom');
const { FaMeteor, FaUserPlus } = require('react-icons/fa');

function Nav(props) {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span className="fs-4"><FaMeteor /> PlattsWork </span>
        </Link>

        <ul className="nav nav-pills">
          <li className="nav-item"><NaviLink to="/">Home</NaviLink></li>
          <li className="nav-item"><NaviLink to="/login">Log In</NaviLink></li>
          <li className="nav-item"><NaviLink to="/register"><FaUserPlus /> Register</NaviLink></li>
          <li className="nav-item"><NaviLink to="/faqs">FAQs</NaviLink></li>
          <li className="nav-item"><NaviLink to="/about">About</NaviLink></li>
          <li className='nav-item'><LoginButton /></li>
        </ul>
      </header>
    </div>
  );
  
}
export default Nav;
