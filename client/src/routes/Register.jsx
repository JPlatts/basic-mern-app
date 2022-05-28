import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../modules/common'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'

function Register() {
  
  const [formData, setFormData] = useState({
    firstName: 'Joe',
    lastName: 'Platts',
    email: 'japlatts@gmail.com',
    password: '1Double2@',
    confirmPassword: '1Double2@',
  });

  // unpack local state
  const {firstName, lastName, email, password, confirmPassword } = formData;
  
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
    
    if(isError) {
      toast.error(message);
    }

    if(isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());

  }, [isError, message, isSuccess, user, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (firstName.trim().length === 0 || lastName.trim().length === 0 || !validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
      toast.error('Hey, you\'re missing some things here!');
    } else {
      dispatch(register(formData));
    }
  }

  
  

  if(isLoading) {
    return (<Spinner>Registering new user ...</Spinner>)
  }
  

  return ( 
    <div className="container">
      <h2><FaUserPlus /></h2>
      <p>Please sign up!</p>
      <form onSubmit={onSubmit}>
        <div className="row justify-content-md-center">
          <div className="col-md-3 mb-2">
            <input className={`form-control ${firstName.trim().length === 0  ? 'is-invalid' : 'is-valid'}`}
              type="text" name="firstName" id="firstName" 
              value={firstName} onChange={onChange} placeholder="First name" autoComplete="off" />
              <div className="invalid-feedback">First name is required.</div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-3 mb-2">
            <input className={`form-control ${lastName.trim().length === 0  ? 'is-invalid' : 'is-valid'}`} type="text" name="lastName" id="lastName" 
              value={lastName} onChange={onChange} placeholder="Last name" autoComplete="off" />
            <div className="invalid-feedback">Last name is required.</div>
          </div>
        </div>  
        <div className="row justify-content-md-center">
          <div className="col-md-3 mb-2">
            <input className={`form-control ${validateEmail(email) ? 'is-valid' : 'is-invalid'}`} 
              type="text" name="email" id="email" value={email} 
              onChange={onChange} placeholder="Email" autoComplete="off"/>
            <div className="invalid-feedback">{email.trim().length === 0 ? 'Email is required.' : 'Email is invalid.'}</div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-3 mb-2">
            <input className={`form-control ${validatePassword(password) ? 'is-valid' : 'is-invalid'}`} 
                type="password" name="password" id="password" value={password} 
                onChange={onChange} placeholder="Password" autoComplete="off" />
                <div className="invalid-feedback">{password.trim().length === 0 ? 'Password is required.' : 'Password is too week.'}</div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-3 mb-2">
            <input className={`form-control ${(confirmPassword.trim().length === 0 || confirmPassword !== password) ? 'is-invalid' : 'is-valid'}`} 
              type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm Password" autoComplete="off" />
              <div className="invalid-feedback">{confirmPassword.trim().length === 0 ? 'Password confirmation is required.' : 'Passwords do not match.'}</div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-3 mb-2">
            <button className="btn btn-primary w-100"><FaUserPlus /> Sign up.</button>
          </div>
        </div>
      </form>
    </div>
            
              
            
            
              
            
            
              
            
            
              
            
            
        
        
  );

}
export default Register;