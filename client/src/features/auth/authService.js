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

const authService = {
  register,
}

export default authService;