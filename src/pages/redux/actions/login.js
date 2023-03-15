import axios from 'axios';

export const loginUser = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_PENDING' });
    const result = await axios.post(`http://localhost:8000/users/login`, data);
    const user = result.data.data;
    localStorage.setItem('token', user.token);
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user });
    navigate('/');
    console.log('user login success');
    console.log('my token', user.token);
  } catch (err) {
    console.log('user login error');
    console.log(err);
  }
};
