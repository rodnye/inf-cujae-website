import styles from './LineButton.module.css';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  color?: string;
}

export const LineButton: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
  color = 'text-on-primary',
}) => {
  return (
    <div className={color}>
      <button
        onClick={onClick}
        className={`${styles.button}`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
