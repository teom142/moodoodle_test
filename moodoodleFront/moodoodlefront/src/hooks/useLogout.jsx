import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const navigate = useNavigate();

  const logout = () =>
    axios
      .post('/user/logout')
      .then(() => {
        localStorage.removeItem('user_id');
        navigate('/start');
      })
      .catch((error) => {
        const { message } = error.response.data;
        alert(message);
      });

  return { logout };
}
