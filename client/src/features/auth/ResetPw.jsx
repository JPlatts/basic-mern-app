import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { validateEmail, validatePassword} from '../../modules/common';
import { FaUserCheck } from 'react-icons/fa';
import { resetpw, reset } from './authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../app/Spinner';

function ResetPw() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { state: locState } = useLocation();

  const { user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    resetCode: '',
    email:  locState && locState.email,
    password: '',
    confirmPassword: '',
  });

  const { resetCode, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (resetCode.trim().length === 0 || !validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
      toast.error('Hey, you\'re missing some things here!');
    } else {
      dispatch(resetpw(formData));
    }
  }

  useEffect(() => {
        
    if(isSuccess && user) {
      navigate('/');
    }
    
    dispatch(reset());

  }, [isError, message, isSuccess, user, navigate, dispatch]);

  if(isLoading) {
    return (<Spinner>Authenticating ... </Spinner>);
  }


  return (
    <div className="section">
      <form onSubmit={onSubmit}>
        <div className="columns is-centered">
          <div className="column is-half box">
            <h1 className='title'>Reset password!</h1>
            <p>An email has been sent with a password reset validation code.</p>
            <div className="field">
              <input type="text" className={`input ${resetCode.trim().length === 0  ? 'is-danger' : 'is-success'}`}
              name="resetCode" id="resetCode" 
              value={resetCode} onChange={onChange} placeholder="Password Reset Verification Code" autoComplete="off" />
              <p className={`help is-danger ${resetCode.trim().length !== 0  ? 'is-hidden' : ''}`} >Verificaton code is required.</p>
            </div>

            <div className="field">
              <input type="text" className={`input ${!validateEmail(email)  ? 'is-danger' : 'is-success'}`}
              name="email" id="email" 
              value={email} onChange={onChange} placeholder="Email" autoComplete="off" />
              <p className={`help is-danger ${email.trim().length !== 0  ? 'is-hidden' : ''}`} >Email is required.</p>
              <p className={`help is-danger ${email.trim().length > 0 && !validateEmail(email) ? '' : 'is-hidden'}`} >Email is invalid.</p>
            </div>

            <div className="field">
              <input type="password" className={`input ${!validatePassword(password)  ? 'is-danger' : 'is-success'}`}
              name="password" id="password" 
              value={password} onChange={onChange} placeholder="Password" autoComplete="off" />
              <p className={`help is-danger ${password.trim().length !== 0  ? 'is-hidden' : ''}`} >Password is required.</p>
              <p className={`help is-danger ${password.trim().length > 0 && !validatePassword(password) ? '' : 'is-hidden'}`} >Password is invalid.</p>
            </div>

            <div className="field">
              <input type="password" className={`input ${!validatePassword(confirmPassword)  ? 'is-danger' : 'is-success'}`}
              name="confirmPassword" id="confirmPassword" 
              value={confirmPassword} onChange={onChange} placeholder="Confirm Password" autoComplete="off" />
              <p className={`help is-danger ${confirmPassword.trim().length !== 0  ? 'is-hidden' : ''}`} >Password confirmation is required.</p>
              <p className={`help is-danger ${confirmPassword.trim().length > 0 && password !== confirmPassword ? '' : 'is-hidden'}`} >Passwords do not match.</p>
            </div>
            
            <div className="field ">
              <div className="control">
                <button className="button is-medium is-fullwidth is-link"><FaUserCheck />&nbsp;Set password.</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>       
  );
}
export default ResetPw;