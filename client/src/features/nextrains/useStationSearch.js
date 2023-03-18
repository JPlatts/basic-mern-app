import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';


export default function useStationSearch(searchText) {
  const {user} = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [stations, setStations] = useState([]);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorText('');
    const ah = new Headers();
    ah.append('Content-Type', 'application/json');
    ah.append('Authorization', user.token);
    let cancelGet = null;
    if(searchText) {
    axios({
      method: 'GET',
      headers: {'Authorization': `${user.token}` },
      url: `/api/stations/find/${searchText}`,
      cancelToken: new axios.CancelToken(c => cancelGet = c)
    }).then(r => {
      setStations(r.data.records);
      setErrorText('');
    }).catch(e => {
      if (axios.isCancel(e)) {
        return;
      }
      setStations([]);
      setErrorText(JSON.stringify(e));
    }).finally(() => {
      setIsLoading(false);
    });
    return () => {
      cancelGet()
    };
   } else {
    setStations([]);
   }
  }, [searchText, user.token])
  
  return { isLoading, errorText, stations, };

}
