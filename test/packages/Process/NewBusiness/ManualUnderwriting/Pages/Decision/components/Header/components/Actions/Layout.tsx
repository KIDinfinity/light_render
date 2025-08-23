import React from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import classnames from 'classnames';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import { tenant, Region } from '@/components/Tenant';
import styles from './layout.less';
import { ActivityStatus } from 'bpm/pages/Information/enum/index';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetAddDPRemarkVisible from './_hooks/useGetAddDPRemarkVisible';
import useGetWaiveLoadingData from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetWaiveLoadingData';

const Actions = ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  const taskStatus = useSelector(({ processTask }: any) => processTask?.getTask?.taskStatus);

  const addDPRemarkVisible = useGetAddDPRemarkVisible();
  const isShowUWMEDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.displayUWMELink,
    shallowEqual
  );
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const waiveLoadingData = useGetWaiveLoadingData();

  return (
    <div
      className={classnames(styles.container, {
        [styles.showUWEDecision]: isShowUWMEDecision,
      })}
    >
      {editable &&
        tenant.region({
          [Region.KH]: () => <div className={styles.currency}>{slots.get('currency')}</div>,
          notMatch: () => null,
        })}
      {taskStatus !== ActivityStatus.Completed && (
        <>
          {slots.get('sustainabilityModalBtn')}
          {!lodash.isEmpty(waiveLoadingData) &&
            tenant.region({
              [Region.KH]: () => (
                <div className={styles.waiveLoading}>{slots.get('waiveLoading')}</div>
              ),
              notMatch: () => null,
            })}

          {editable && addDPRemarkVisible && (
            <div className={styles.addDPRemark}>{slots.get('addDPRemark')}</div>
          )}

          {editable && <div className={styles.addExclusion}>{slots.get('addExclusion')}</div>}
          {editable && <div className={styles.addLoading}>{slots.get('addLoading')}</div>}
        </>
      )}
    </div>
  );
};

Actions.displayName = 'Actions';

export default Actions;
