import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Nuestro tiempo juntos <span className={styles.heartIcon}>&hearts;</span>
      </h1>
      <p className={styles.date}>1 de Noviembre de 2025</p>
    </header>
  );
}
