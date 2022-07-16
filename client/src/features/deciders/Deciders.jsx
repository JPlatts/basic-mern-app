import { useEffect } from 'react';
import { FaDice } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getDeciders, reset } from './deciderSlice'
import Decider from './Decider';
import { toast } from 'react-toastify';
import Spinner from '../../app/Spinner';
import DeciderForm from './DeciderForm';

function Deciders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const {deciders, isError, message, isLoading} = useSelector((state) => state.deciders)
  

  

  useEffect(()=>{
    if(isError) {
      toast.error(message);
    }
    if(user) {
      dispatch(getDeciders(user.token))
    } else {
      navigate('/');
    }
    dispatch(reset());
  },[user,isError, message, navigate,dispatch])
  
  if (isLoading) {
    return (<Spinner>Loading deciders ...</Spinner>);
  }

  return (
    <div className="container">
      <div className="content">
        <h1><FaDice /> Decider </h1>
      </div>
      <hr />
      {deciders.map((d) => (<Decider key={d._id} decider={d}/>))}
      <DeciderForm />
    </div>
        
    
  );
}

export default Deciders
