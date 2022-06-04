const API_URL = '/api/deciders/'

const getDeciders = async (token) => {
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

const addItem = async (token, deciderItem) => {
  let ah = new Headers();
  ah.append('Content-Type', 'application/json');
  ah.append('Authorization', token);
  let response = await fetch(API_URL + 'add-item', { 
        method: 'POST',
        headers: ah,
        body: JSON.stringify({
          ...deciderItem,
        }),

      });
  let data = await response.json();
  
  return data;
};

const deleteItem = async (token, deciderItem) => {
  let ah = new Headers();
  ah.append('Content-Type', 'application/json');
  ah.append('Authorization', token);
  let response = await fetch(API_URL + 'delete-item', { 
        method: 'POST',
        headers: ah,
        body: JSON.stringify({
          ...deciderItem,
        }),

      });
  let data = await response.json();
  
  return data;
};

const deciderService = {
  getDeciders,
  addItem,
  deleteItem
};

export default deciderService;