import React from 'react';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import { tenant, Region } from '@/components/Tenant';
import useJudgeDisplayGenerateSIButton from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayGenerateSIButton';
import styles from './layout.less';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config.ts';

const Actions = ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  const failCloseEnquiry = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.failCloseEnquiry,
    shallowEqual
  );
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
        {displaySIButton && slots.get('genderateSI')}
        {failCloseEnquiry === 'Y' && slots.get('getUWMeResult')}
      </>
    </div>
  );
};

Actions.displayName = 'Actions';

export default Actions;
