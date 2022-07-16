const API_URL = '/api/nextrains/';
const STATION_API_URL = '/api/stations/';

const getNextrains = async (token) => {
  let ah = new Headers();
  ah.append('Content-Type', 'application/json');
  ah.append('Authorization', token);
  let response = await fetch(API_URL, { 
        method: 'GET',
        headers: ah
      });
  let data = await response.json();
  return data;
};

const addStation = async (token, station) => {
  let ah = new Headers();
  ah.append('Content-Type', 'application/json');
  ah.append('Authorization', token);
  let response = await fetch(STATION_API_URL + 'add', { 
        method: 'POST',
        headers: ah,
        body: JSON.stringify({
          ...station,
        }),

      });
  let data = await response.json();
  return data;
};

const deleteStation = async (token, station) => {
  let ah = new Headers();
  ah.append('Content-Type', 'application/json');
  ah.append('Authorization', token);
  let response = await fetch(STATION_API_URL + 'delete', { 
        method: 'POST',
        headers: ah,
        body: JSON.stringify({
          ...station,
        }),

      });
  let data = await response.json();
  return data;
};


const nextrainService = {
  getNextrains,
  addStation,
  deleteStation
};


export default nextrainService;