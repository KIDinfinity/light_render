import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });

  return (
    <div className={styles.container}>
      <div>{slots.get('productSelect')}</div>
      <div>{slots.get('DPRemarkItems')}</div>
      <div>{slots.get('addButton')}</div>
    </div>
  );
};
