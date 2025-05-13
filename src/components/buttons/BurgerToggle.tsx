'use client';
import { useState } from 'react';
import styles from './BurgerToggle.module.css';

interface Props {
  onClick?: (isActive: boolean) => void;
}

export const BurgerToggle: React.FC<Props> = ({ onClick }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const newActiveState = !active;
    setActive(newActiveState);
    if (onClick) {
      onClick(newActiveState);
    }
  };

  return (
    <div>
      <input
        className={styles.checkbox}
        id="toggle"
        type="checkbox"
        onChange={handleClick}
        checked={active}
      />
      <label className={styles.burger} htmlFor="toggle">
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </label>
    </div>
  );
};
