import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  color?: string;
  to?: string;
}

export const LineButton: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
  to,
  color = 'text-on-primary',
}) => {
  const router = useRouter();
  const handleClick = () => {
    if (to) {
      router.push(to);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={color}>
      <button
        onClick={handleClick}
        className={`${styles.button}`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
