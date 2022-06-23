const API_URL = '/api/stations/'

const searchStations = async (searchRequest, token) => {
  let ah = new Headers();
  ah.append('Content-Type', 'application/json');
  ah.append('Authorization', token);
  let response = await fetch(`${API_URL}find/${searchRequest.searchText}`, { 
        method: 'GET',
        headers: ah,
      });
  let data = await response.json();
  return data;
};

const stationService = {
  searchStations,
};

export default stationService;