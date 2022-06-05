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

const addDecider = async (token, decider) => {
  let ah = new Headers();
  ah.append('Content-Type', 'application/json');
  ah.append('Authorization', token);
  let response = await fetch(API_URL + 'add', { 
        method: 'POST',
        headers: ah,
        body: JSON.stringify({
          ...decider,
        }),

      });
  let data = await response.json();
  return data;
};

const deleteDecider = async (token, decider) => {
  let ah = new Headers();
  ah.append('Content-Type', 'application/json');
  ah.append('Authorization', token);
  let response = await fetch(API_URL + 'delete', { 
        method: 'POST',
        headers: ah,
        body: JSON.stringify({
          ...decider,
        }),

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
  addDecider,
  deleteDecider,
  addItem,
  deleteItem
};

export default deciderService;