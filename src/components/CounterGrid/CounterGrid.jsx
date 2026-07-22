import { useRef, useEffect, useState } from 'react';
import styles from './CounterGrid.module.css';

const UNITS = [
  { key: 'years', label: 'A\u00f1os' },
  { key: 'months', label: 'Meses' },
  { key: 'days', label: 'D\u00edas' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Minutos' },
  { key: 'seconds', label: 'Segundos' },
];

function CounterCard({ value, label, unit }) {
  const [pulsing, setPulsing] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      setPulsing(true);
      prevRef.current = value;
      const t = setTimeout(() => setPulsing(false), 150);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className={`${styles.card} ${unit === 'seconds' ? styles.secondsCard : ''}`}>
      <span
        className={`${styles.value} ${pulsing ? styles.pulse : ''}`}
        data-unit={unit}
      >
        {value}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function CounterGrid({ elapsed }) {
  return (
    <section className={styles.grid}>
      {UNITS.map((u, i) => (
        <div key={u.key} className={styles.appear} style={{ animationDelay: `${0.4 + i * 0.05}s` }}>
          <CounterCard
            value={elapsed[u.key]}
            label={u.label}
            unit={u.key}
          />
        </div>
      ))}
    </section>
  );
}
