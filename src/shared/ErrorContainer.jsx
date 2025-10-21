import styles from "./ErrorContainer.module.css"

function ErrorContainer({ children, onDismiss }) {
  const message =
    children && children.length > 0 ? children : 'An unknown error occurred.';

    console.log(message)
  return (
    <div className={styles.errorBanner}>
      <p className={styles.errorText}>{message}</p>
      <button className={styles.dismissButton}onClick={onDismiss}>Dismiss</button>
    </div>
  );
}

export default ErrorContainer;
