import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../modules/common'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { FaUserCheck, FaUserPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'

function Login() {
  
  const [formData, setFormData] = useState({
    email: 'japlatts@gmail.com',
    password: '1Double2@',
  });

  // unpack local state
  const { email, password } = formData;
  
  // unpack redux state
  const { user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth);

  
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

    if(isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());

  }, [isError, message, isSuccess, user, navigate, dispatch]);

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

  if(isLoading) {
    return (<Spinner>Authenticating ... </Spinner>);
  }

  return ( 
    <div className="section">
      <form onSubmit={onSubmit}>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <h1 className='title'>Please sign in!</h1>
            <div className="field">
              <input className="input" type="text" name="email" id="email" value={email} 
                onChange={onChange} placeholder="Email" autoComplete="off"/>
            </div>
            <div className="field">
              <input className="input" type="password" name="password" id="password" value={password} 
                onChange={onChange} placeholder="Password" autoComplete="off" />
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link"><FaUserCheck />&nbsp;Sign in.</button>&nbsp;&nbsp;
              </div>
              <div className="control">
                <button type='button' className="button is-link is-success" onClick={(e) => register()}><FaUserPlus />&nbsp;Sign Up!</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
      
    
          
        
  );

}
export default Login;