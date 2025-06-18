import styles from './BurgerToggle.module.css';

interface Props {
  isActive: boolean;
  onClick?: (isActive: boolean) => void;
}

export const BurgerToggle: React.FC<Props> = ({ isActive, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(!isActive);
    }
  };

  return (
    <div>
      <input
        className={styles.checkbox}
        id="toggle"
        type="checkbox"
        onChange={handleClick}
        checked={isActive}
      />
      <label className={styles.burger} htmlFor="toggle">
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </label>
    </div>
  );
};
