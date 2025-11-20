import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function LogoutBtn() {
  const StyledLogoutButton = styled.button`
    background-color: transparent;
    border: none;
    padding: 0;
    color: grey;
    font-weight: 500;
  font-size: inherit;
    transition: color 0.2s ease-in-out, background-color 0.2s;


    &:hover {
      color: white; /* Example: Darken text */
      /* Add a subtle background highlight */
      background-color: #b48a78 ;
      border-radius: 4px;
      padding: 0 5px; /* Add slight padding on hover */
    }
  `;
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
    <StyledLogoutButton onClick={handleLogout} >
      Logout
    </StyledLogoutButton>
  );
}
