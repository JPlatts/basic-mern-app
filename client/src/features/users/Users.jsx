import { useEffect } from 'react';
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchUsers, reset } from './userSlice'
import { toast } from 'react-toastify';
import Spinner from '../../app/Spinner';


export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const {users, isError, message, isLoading} = useSelector((state) => state.users)
  

  

  useEffect(()=>{
    if(isError) {
      toast.error(message);
    }
    if(user && !isError) {
      dispatch(fetchUsers())
    } else {
      navigate('/');
    }
    dispatch(reset());
  },[user,isError, message, navigate,dispatch])
  
  if (isLoading) {
    return (<Spinner>Loading deciders ...</Spinner>);
  }

  let rows = users.map((u) => (
    <tr>
      <td>{u.email}</td>
      <td>{u.firstName}</td>
      <td>{u.lastName}</td>
      <td>{u.creationDate}</td>
      <td>{u.isLocked.toString()}</td>
    </tr>
  ));

  return (
    <div className="container">
      <div className="content">
        <h1><FaUser /> Users </h1>
      </div>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Created On</th>
            <th>Locked</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
        
    
  );
}


