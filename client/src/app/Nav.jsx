import LoginButton from '../features/auth/LoginButton';
import { useSelector } from 'react-redux';
const React = require('react');
const { Link } = require('react-router-dom');
const { FaMeteor, FaDice, FaInfoCircle, FaTrain, FaUser } = require('react-icons/fa');

function Nav() {
  const [isActive, setisActive] = React.useState(false);
  const {user} = useSelector((state) => state.auth);
  return (
    <section className="">
      <nav className="navbar  ">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/" >
            <FaMeteor />&nbsp;<strong>PlattsWork</strong>
          </Link>
          <div onClick={() => {setisActive(!isActive);}} role="button" className={`navbar-burger burger ${isActive ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            {user && <Link className="navbar-item" to="/nextrains"><FaTrain />&nbsp;NexTrain</Link>}
            {user && <Link className="navbar-item" to="/Deciders"><FaDice />&nbsp;Decider</Link>}
            {user && user.isAdmin && <Link className="navbar-item" to="/Users"><FaUser />&nbsp;Users</Link>}
            <Link className="navbar-item" to="/About"><FaInfoCircle />&nbsp;About</Link>
          </div>
          <div className="navbar-end">
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
