import styles from './style.less';

const HeaderLabel = ({ label }: any) => {
  return (
    <div className={styles.header}>
      <div className={styles.number}>{label}</div>
    </div>
  );
};

export default HeaderLabel;
