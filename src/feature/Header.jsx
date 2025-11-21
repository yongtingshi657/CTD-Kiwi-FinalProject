import { Link, NavLink } from 'react-router-dom';
import styles from "./Header.module.css"
import { useAuth } from '../context/useAuth';
import LogoutBtn from './LogoutBtn';

function Header() {
  const {currentUser} = useAuth()
  
  return (
   <header className={styles.header}>
    <h1 className={styles.title}>My Product Tracker</h1>
     <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>About</NavLink> 
       { currentUser ? <LogoutBtn/>: <Link to='/login' ><button className={styles.loginBtn}>Login</button></Link>}
    </nav>
   
   </header>
  )
}

export default Header