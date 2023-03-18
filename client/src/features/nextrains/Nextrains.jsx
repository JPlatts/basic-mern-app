import { useEffect } from 'react';
import { FaTrain } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getNextrains, addStation, reset } from './nextrainSlice'
import { toast } from 'react-toastify';
import StationPicker from './StationPicker';
import Nextrain from './Nextrain';


function Nextrains() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const { nextrains, isError, message, isLoading} = useSelector((state) => state.nextrains);
    
  useEffect(()=>{
    if(isError) {
      toast.error(message);
    }
    if(user && !isError) {
      dispatch(getNextrains())
    } else {
      navigate('/');
    }
    dispatch(reset());
  },[user,isError, message, navigate,dispatch])

  useEffect(() => {
    const intervalId = setInterval(() => { 
      console.log('punching')
      dispatch(getNextrains()); 
    },30000);
    return () => clearInterval(intervalId);
  },[dispatch]);

  const chosen = (v) => {
    dispatch(addStation(v));
  }

  
  return (
    <div className="container">
      <div className="content">
        <h1><FaTrain /> NexTrain</h1>
        <p className="subtitle">Oi vey, protobuffers.</p>
        <hr />
        <StationPicker stationChosen={chosen} />
        {nextrains.map((n) => (<Nextrain key={n.station._id} nextrain={n} loading={isLoading}/>))}
      </div>
    </div>
  );

}
export default Nextrains;