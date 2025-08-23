import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import { tenant, Region } from '@/components/Tenant';
import useJudgeDisplayGenerateSIButton from '../_hooks/useJudgeDisplayGenerateSIButton';
import styles from './layout.less';

const Actions = ({ children }: any) => {
  const slots = useRegisteredSlots({ children });

  const displaySIButton = useJudgeDisplayGenerateSIButton();
  return (
    <div className={styles.container}>
      <>
        {tenant.region({
          [Region.MY]: () => slots.get('initialVersion'),
          notMatch: () => null,
        })}
        {slots.get('reAutoUnderwrite')}
        {slots.get('reCalculate')}
        {displaySIButton && <div className={styles.generateSI}>{slots.get('genderateSI')}</div>}
        {tenant.region({
          [Region.VN]: () => slots.get('checkAMLOrCRR'),
          notMatch: () => null,
        })}
        {slots.get('getUWMeResult')}
        {tenant.region({
          [Region.VN]: () => slots.get('addLinkedPolicy'),
          notMatch: () => null,
        })}
      </>
    </div>
  );
};

Actions.displayName = 'Actions';

export default Actions;
