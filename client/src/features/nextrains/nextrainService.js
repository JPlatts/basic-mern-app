const API_URL = '/api/nextrains/'

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

const nextrainService = {
  getNextrains,
};

export default nextrainService;