import LoginButton from './LoginButton';

const React = require('react');
const { Link } = require('react-router-dom');
const { FaMeteor } = require('react-icons/fa');

function Nav() {
  const [isActive, setisActive] = React.useState(false);
  return (
    <section className="">
      <nav className="navbar is-light">
        <div className="navbar-brand">
          
          <div onClick={() => {setisActive(!isActive);}} role="button" className={`navbar-burger burger ${isActive ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
          <Link className="navbar-item" to="/" >
            <FaMeteor />&nbsp;<strong>PlattsWork</strong>
          </Link>
        </div>
        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-end">
            <Link className="navbar-item" to="/About">About</Link>
          </div>
          <div className="navbar-start">
            <div className="buttons">
              <LoginButton />
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
  
}
export default Nav;
