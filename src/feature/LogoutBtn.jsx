import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LogoutBtn() {
  const styles = {
    backgroundColor: 'grey',
  };
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    const isConfirmed = window.confirm('Are you sure you want to logOut');
    if (!isConfirmed) {
      console.log('Signout cancelled by user.');
      return;
    }
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  if (!currentUser) {
    return null;
  }

  return (
    <button onClick={handleLogout} style={styles}>
      Logout
    </button>
  );
}
