import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { confirm, reset } from '../features/auth/authSlice'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import Spinner from './Spinner';

function AccountConfirmation() {
  
  const [confirmationCode, setConfirmationCode] = useState('');
  
  const { user, isSuccess, isError, message, isLoading } = useSelector((s) => s.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onChange(e) {
    setConfirmationCode(e.target.value)
  }

  function onConfirm(e) {
    e.preventDefault();
    if(confirmationCode.trim().length === 0){
      toast.error('Confirmation code is required.')
    } else {
      dispatch(confirm({userID: user._id, confirmationCode: confirmationCode}));
    }
  }

  //react hook for watching changes
  useEffect(() => {
    
    if(isError) {
      toast.error(message);
    }

    dispatch(reset());

  }, [isError, message, isSuccess, user, navigate, dispatch]);
  
  if (isLoading) {
    return (<Spinner />);
  }

  return (
    <div className={`modal ${user && !user.confirmationDate ? 'is-active':''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Account Confirmation</p>
        </header>
        <section className="modal-card-body">
          <p className="">An email with an account verication code has been sent.  Please enter the code to confirm your account.</p>
          <input type="text" className="input" onChange={(e)=>onChange(e)} placeholder="Confirmation Code"/>
        </section>
        <footer className="modal-card-foot">
          <button  className="button is-success" onClick={(e) => onConfirm(e)} >Confirm</button>&nbsp;
        </footer>
      </div>
    </div>
  );
  
  

}
export default AccountConfirmation