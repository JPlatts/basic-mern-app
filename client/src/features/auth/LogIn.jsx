import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../modules/common'
import Spinner from '../../app/Spinner';
import { useNavigate } from 'react-router-dom'
import { FaUserCheck, FaUserPlus, FaBrain } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login, forgotpw, reset } from './authSlice'

function Login() {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // unpack local state
  const { email, password } = formData;
  
  // unpack redux state
  const { user, isResettingPassword, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth);

  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  }

  //react hook for watching changes
  useEffect(() => {
    
    if(isResettingPassword) {
      navigate('/resetpw', {state: { email: email }})
    }

    if(isSuccess && user) {
      navigate('/');
    }

    

    dispatch(reset());

  }, [isError, message, isSuccess, user, email, isResettingPassword, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if ( !validateEmail(email) || !validatePassword(password)) {
      toast.error('Hey, you\'re missing some things here!');
    } else {
      dispatch(login(formData));
    }
  }
  
  const register = (e) => {
    navigate('/register');
  }

  const forgot = (e) => {
    if ( !validateEmail(email)) {
      toast.error('Email is required.');
    } else {
      dispatch(forgotpw(formData));
    }
  }

  if(isLoading) {
    return (<Spinner>Authenticating ... </Spinner>);
  }

  return ( 
    <div className="section">
      <form onSubmit={onSubmit}>
        <div className="columns is-mobile is-centered">
          <div className="column is-four-fifths">
            <h1 className='title'>Please sign in!</h1>
            <div className="field">
              <input className="input" type="text" name="email" id="email" value={email} 
                onChange={onChange} placeholder="Email" autoComplete="off"/>
            </div>
            <div className="field">
              <input className="input" type="password" name="password" id="password" value={password} 
                onChange={onChange} placeholder="Password" autoComplete="off" />
            </div>
            <div className="field ">
              <div className="control">
                <button className="button is-small is-fullwidth is-link"><FaUserCheck />&nbsp;Sign in.</button>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type='button' className="button is-small is-fullwidth is-link is-success" onClick={(e) => register()}><FaUserPlus />&nbsp;Sign Up!</button>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type='button' className="button is-small is-link is-warning is-fullwidth" onClick={(e) => forgot()}><FaBrain />&nbsp;Forgot Password?</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
      
    
          
        
  );

}
export default Login;