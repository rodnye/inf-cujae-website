import React from 'react';
import styles from './TextField.module.css';

interface Props {
  placeholder?: string;
  value: string;
  type?: string;
  name?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
  minLength?: number;
}

export const TextField: React.FC<Props> = ({
  type = 'text',
  placeholder = '...',
  name,
  value,
  onChange,
  className = '',
  required,
  rows = 1,
  disabled = false,
  minLength,
}) => {
  return (
    <div className={styles.container + ' ' + className}>
      {rows > 1 ? (
        <textarea
          className={styles.input}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          required={required}
          minLength={minLength}
        />
      ) : (
        <input
          className={styles.input}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          required={required}
          disabled={disabled}
          minLength={minLength}
        />
      )}
    </div>
  );
};
