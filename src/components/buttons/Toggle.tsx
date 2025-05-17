import React from 'react';
import styles from './Toggle.module.css';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Toggle: React.FC<Props> = ({
  checked,
  onChange,
  label,
  className = '',
}) => {
  return (
    <label className={styles.container + ' ' + className}>
      <div className={styles.toggle}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.slider} />
      </div>
      {label}
    </label>
  );
};
