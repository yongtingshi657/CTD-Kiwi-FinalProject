import { NavLink } from 'react-router-dom';
import styles from "./Header.module.css"

function Header() {
  return (
   <header className={styles.header}>
    <div className={styles.title}>My Product Tracker</div>
     <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Home</NavLink>
        <NavLink to="/add" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Add Product</NavLink>
    </nav>
   </header>
  )
}

export default Header