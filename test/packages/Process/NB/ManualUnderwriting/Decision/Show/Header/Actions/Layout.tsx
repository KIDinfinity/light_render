import React from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import classnames from 'classnames';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import { tenant, Region } from '@/components/Tenant';
import styles from './layout.less';
import { ActivityStatus } from 'bpm/pages/Information/enum/index';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetUWMELinkRule from 'process/NB/ManualUnderwriting/_hooks/useGetUWMELinkRule';
import useGetAddDPRemarkVisible from 'process/NB/ManualUnderwriting/_hooks/useGetAddDPRemarkVisible';
import useGetWaiveLoadingData from 'process/NB/ManualUnderwriting/_hooks/useGetWaiveLoadingData';

const Actions = ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  const taskStatus = useSelector(({ processTask }: any) => processTask?.getTask?.taskStatus);
  const sustainabilityModalBtnVisible = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.sustainabilityModalBtnVisible,
    shallowEqual
  );
  const addDPRemarkVisible = useGetAddDPRemarkVisible();
  const isShowUWMEDecision = useGetUWMELinkRule();
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
          {editable && sustainabilityModalBtnVisible && (
            <div className={styles.sustainability}>{slots.get('sustainabilityModalBtn')}</div>
          )}
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
