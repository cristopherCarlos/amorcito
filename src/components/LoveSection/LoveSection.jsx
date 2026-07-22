import FireworksCanvas from '../FireworksCanvas/FireworksCanvas';
import { useClickBurst } from '../../hooks/useClickBurst';
import styles from './LoveSection.module.css';

const HEARTS_TOP = [
  { cls: 'lh1', delay: '0s', size: '1rem', color: '#ef9a9a' },
  { cls: 'lh2', delay: '0.1s', size: '0.8rem', color: '#f48fb1' },
  { cls: 'lh3', delay: '0.2s', size: '1.3rem', color: '#ec407a' },
  { cls: 'lh4', delay: '0.3s', size: '0.8rem', color: '#f48fb1' },
  { cls: 'lh5', delay: '0.4s', size: '1rem', color: '#ef9a9a' },
];

const HEARTS_BOTTOM = [
  { cls: 'lh6', delay: '0.5s', size: '0.9rem', color: '#ce93d8' },
  { cls: 'lh7', delay: '0.6s', size: '1.2rem', color: '#ba68c8' },
  { cls: 'lh8', delay: '0.7s', size: '1.5rem', color: '#ab47bc' },
  { cls: 'lh9', delay: '0.8s', size: '1.2rem', color: '#ba68c8' },
  { cls: 'lh10', delay: '0.9s', size: '0.9rem', color: '#ce93d8' },
];

export default function LoveSection() {
  const { bursts, triggerBurst } = useClickBurst();

  return (
    <section className={styles.loveSection} onClick={triggerBurst}>
      <FireworksCanvas />
      <div className={styles.message}>
        <div className={styles.heartsRow}>
          {HEARTS_TOP.map((h) => (
            <span
              key={h.cls}
              className={`${styles.heart} ${styles[h.cls]}`}
              style={{ animationDelay: h.delay, fontSize: h.size, color: h.color }}
            >
              &hearts;
            </span>
          ))}
        </div>
        <h2 className={styles.title}>Te Amo</h2>
        <h3 className={styles.name}>Megumi</h3>
        <div className={`${styles.heartsRow} ${styles.bottom}`}>
          {HEARTS_BOTTOM.map((h) => (
            <span
              key={h.cls}
              className={`${styles.heart} ${styles[h.cls]}`}
              style={{ animationDelay: h.delay, fontSize: h.size, color: h.color }}
            >
              &hearts;
            </span>
          ))}
        </div>
      </div>

      {bursts.map((b) => (
        <span
          key={b.id}
          className={styles.burstHeart}
          style={{
            left: b.x,
            top: b.y,
            color: b.color,
            fontSize: b.fontSize,
            '--tx': `${b.tx}px`,
            '--ty': `${b.ty}px`,
            '--rot': `${b.rot}deg`,
          }}
        >
          {b.char}
        </span>
      ))}
    </section>
  );
}
