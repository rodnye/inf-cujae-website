import React from 'react';
import styles from './TextField.module.css';

interface Props {
  placeholder?: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TextField: React.FC<Props> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={styles.container + ' ' + className}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
    </div>
  );
};
