import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

 const StyledLogoutButton = styled.button`
    background-color: grey;
    border: none;
    padding: 10px;
    color: white;
    font-weight: 500;
    font-size: inherit;
    transition: color 0.2s ease-in-out, background-color 0.2s;
    margin: 0;
    cursor: pointer;


    &:hover {
      background-color: #b48a78 ;
      border-radius: 4px;
      padding: 10px;/* Add slight padding on hover */
    }
  `;

export default function LogoutBtn() {
 
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
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  if (!currentUser) {
    return 
  }

  return (
    <StyledLogoutButton onClick={handleLogout} >
      Logout
    </StyledLogoutButton>
  );
}
