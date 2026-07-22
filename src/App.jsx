import { useElapsedTime } from './hooks/useElapsedTime';
import FloatingHearts from './components/FloatingHearts/FloatingHearts';
import LoveSection from './components/LoveSection/LoveSection';
import Header from './components/Header/Header';
import CounterGrid from './components/CounterGrid/CounterGrid';
import styles from './App.module.css';

export default function App() {
  const elapsed = useElapsedTime();

  return (
    <>
      <FloatingHearts />
      <main className={styles.container}>
        <LoveSection />
        <Header />
        <CounterGrid elapsed={elapsed} />
        <p className={styles.subtitle}>Cada segundo a tu lado es un regalo</p>
      </main>
    </>
  );
}
