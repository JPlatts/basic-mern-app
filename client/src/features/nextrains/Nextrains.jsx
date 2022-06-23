import { useEffect } from 'react';
import { FaTrain } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getNextrains, reset } from './nextrainSlice'
import { toast } from 'react-toastify';
import Spinner from '../../app/Spinner';
import StationFinder from './StationFinder'


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
      dispatch(getNextrains(user.token))
    } else {
      navigate('/');
    }
    dispatch(reset());
  },[user,isError, message, navigate,dispatch])
  
  if (isLoading) {
    return (<Spinner>Loading Nextrains ...</Spinner>);
  }

  const stationChosen = (value) => {
    console.log(value);
  }

  return (
    <div className="">
      <div className="columns is-centered">
        <div className="column is-four-fifths box">
          <div className="content">
            <h1><FaTrain /> NexTrain</h1>
            <p className="subtitle">Oi vey, protobuffers.</p>
            <hr />
            {nextrains && <p>{JSON.stringify(nextrains)}</p>}
          </div>
          <StationFinder stationChosen={stationChosen} />
        </div>
      </div>
    </div>
  );

}
export default Nextrains;