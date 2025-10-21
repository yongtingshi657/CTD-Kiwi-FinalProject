import styles from './SuccessContainer.module.css';
import { FaCheckCircle } from 'react-icons/fa';

function SuccessContainer({ children }) {
  return (
    <div className={styles.successDiv}>
      <FaCheckCircle className={styles.successIcon} />
      <p className={styles.successText}>{children}</p>
    </div>
  );
}

export default SuccessContainer;
