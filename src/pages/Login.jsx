import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import SuccessContainer from '../shared/SuccessContainer';

export default function Login() {
  // loginForm
  const [error, setError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, currentUser, loading:isAuthLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && currentUser) {
      navigate('/', { replace: true }); 
    }
  }, [currentUser, isAuthLoading, navigate]);

  if (isAuthLoading || currentUser) {
      return null; 
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError('')
      setIsLoggingIn(true)
      await login(email, password);
      setSuccessMessage("Login Successfully")
      setTimeout(() => {
          navigate('/');
        }, 500);
    } catch {
      setError(true);
    }

    setIsLoggingIn(false)
  }

  return (
    <div className={styles.loginDiv}>
      <h1>Log In</h1>
      {successMessage && <SuccessContainer>{successMessage}</SuccessContainer>}
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoggingIn}>Login</button>
        {error && <span>Wrong Email or Password</span>}
      </form>
    </div>
  );
}
