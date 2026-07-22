import { useState, useEffect } from 'react';

const START_DATE = new Date(2025, 10, 1, 0, 0, 0);

function pad(n) {
  return String(n).padStart(2, '0');
}

function calculateElapsed(now) {
  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  let hours = now.getHours() - START_DATE.getHours();
  let minutes = now.getMinutes() - START_DATE.getMinutes();
  let seconds = now.getSeconds() - START_DATE.getSeconds();

  if (seconds < 0) {
    minutes--;
    seconds += 60;
  }
  if (minutes < 0) {
    hours--;
    minutes += 60;
  }
  if (hours < 0) {
    days--;
    hours += 24;
  }

  return { years, months, days, hours, minutes, seconds };
}

function formatElapsed(elapsed) {
  return {
    years: pad(elapsed.years),
    months: pad(elapsed.months),
    days: pad(elapsed.days),
    hours: pad(elapsed.hours),
    minutes: pad(elapsed.minutes),
    seconds: pad(elapsed.seconds),
  };
}

export function useElapsedTime() {
  const [elapsed, setElapsed] = useState(() => formatElapsed(calculateElapsed(new Date())));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(formatElapsed(calculateElapsed(new Date())));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return elapsed;
}
