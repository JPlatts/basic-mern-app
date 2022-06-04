
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './authSlice'
const { FaUserMinus, FaUserCheck } = require('react-icons/fa');
const { Link, useNavigate } = require('react-router-dom');


function LoginButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const logoutClicked = () => {
      dispatch(logout());
      navigate('/');
  }

  if (user) {
    return (
      <>
        <button className="button is-link" onClick={logoutClicked} ><FaUserMinus/>&nbsp;Sign out</button>&nbsp;
      </>
    );
  } else {
    return (<><Link className="button is-link is-primary" to="login"><FaUserCheck/>&nbsp;Sign in</Link>&nbsp;</>);
  }

}
export default LoginButton;