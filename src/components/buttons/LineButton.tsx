import { useRouter } from 'next/navigation';
import styles from './LineButton.module.css';

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

  return (
    <div className={color}>
      <button
        onClick={onClick || (() => to && router.push(to))}
        className={`${styles.button}`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
