import styles from './LineButton.module.css';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const LineButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};
