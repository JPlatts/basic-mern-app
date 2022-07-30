import { useEffect } from 'react';
import { FaTrain } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getNextrains,addStation, reset } from './nextrainSlice'
import { toast } from 'react-toastify';
import Spinner from '../../app/Spinner';
import NextrainForm from './NextrainForm';
import Nextrain from './Nextrain';


function Nextrains() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const { nextrains, isError, message, isLoading} = useSelector((state) => state.nextrains)
  
  
  useEffect(()=>{
    if(isError) {
      toast.error(message);
    }
    if(user) {
      dispatch(getNextrains())
    } else {
      navigate('/');
    }
    dispatch(reset());
  },[user,isError, message, navigate,dispatch])
  
  if (isLoading) {
    return (<Spinner>Loading Nextrains ...</Spinner>);
  }

  const stationChosen = (value) => {
    dispatch(addStation(JSON.parse(value)));
  }

  return (
    <div className="container">
      <div className="content">
        <h1><FaTrain /> NexTrain</h1>
        <p className="subtitle">Oi vey, protobuffers.</p>
        <hr />
        {nextrains.map((n) => (<Nextrain key={n.station._id} nextrain={n}/>))}
      </div>
      <NextrainForm stationChosen={stationChosen} />
    </div>
  );

}
export default Nextrains;