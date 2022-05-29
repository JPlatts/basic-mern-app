const API_URL = '/api/users/'

const register = async (userData) => {
  let response = await fetch(`${API_URL}register`, { 
    method: 'POST',  
    body: JSON.stringify({
      ...userData
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  let data =  await response.json();
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

const confirm = async (conf) => {
  let response = await fetch(`${API_URL}confirm`, { 
    method: 'POST',  
    body: JSON.stringify(conf),
    headers: { 'Content-Type': 'application/json' }
  });
  let data =  await response.json();
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

const login = async (userData) => {
  let response = await fetch(`${API_URL}authenticate`, { 
    method: 'POST',  
    body: JSON.stringify({
      ...userData
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  let data =  await response.json();
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register, confirm, logout, login
}

export default authService;