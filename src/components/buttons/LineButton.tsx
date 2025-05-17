import styles from './LineButton.module.css';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const LineButton: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
};
