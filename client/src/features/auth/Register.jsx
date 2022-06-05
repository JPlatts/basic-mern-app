import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../modules/common'
import Spinner from '../../app/Spinner';
import { useNavigate } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from './authSlice'

function Register() {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    // if(isError) {
    //   toast.error(message);
    // }

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
  

  return (<>
    <div className="section">
      <form onSubmit={onSubmit}>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <h1 className='title'>Please sign up!</h1>
            <div className="field">
              <input type="text" className={`input ${firstName.trim().length === 0  ? 'is-danger' : 'is-success'}`}
              name="firstName" id="firstName" 
              value={firstName} onChange={onChange} placeholder="First name" autoComplete="off" />
              <p className={`help is-danger ${firstName.trim().length !== 0  ? 'is-hidden' : ''}`} >First name is required.</p>
            </div>
            <div className="field">
              <input type="text" className={`input ${lastName.trim().length === 0  ? 'is-danger' : 'is-success'}`}
              name="lastName" id="lastName" 
              value={lastName} onChange={onChange} placeholder="Last name" autoComplete="off" />
              <p className={`help is-danger ${lastName.trim().length !== 0  ? 'is-hidden' : ''}`} >Last name is required.</p>
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

            
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link"><FaUserPlus />&nbsp;Sign up.</button>&nbsp;&nbsp;
              </div>
              
            </div>
          </div>
        </div>
      </form>
    </div>  
  </>          
              
            
            
              
            
            
              
            
            
              
            
            
        
        
  );

}
export default Register;