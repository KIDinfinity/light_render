import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Alert } from 'antd';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetPremiumType from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetPremiumType';
import PremiumType from 'opus/NewBusiness/PremiumSettlement/Enum/premiumType';
import useAbortController from '@/components/AbortController/useAbortController';
import useWarnMsgHoldPayment from '../_hooks/useWarnMsgHoldPayment';
import styles from './index.less';

const WarningMessage = () => {
  const dispatch = useDispatch();
  const premiumType = useGetPremiumType();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );

  const { isShow, dictCode, typeCode } = useWarnMsgHoldPayment();
  const settlementReason = lodash.get(businessData, 'policyList[0].settlementReason');
  const { businessNo, caseNo, taskStatus } = lodash.pick(taskDetail, [
    'caseNo',
    'businessNo',
    'taskStatus',
  ]);

  const signal = useAbortController([businessNo, caseNo]);
  const handleRefreshPremium = useCallback(
    (signal: AbortSignal) => {
      if (businessNo && caseNo && tenant.isTH()) {
        dispatch({
          type: `${NAMESPACE}/refreshPremium`,
          payload: {
            onlyRefreshPremium: true,
            businessNo,
            caseNo,
            signal,
          },
        });
      }
    },
    [businessNo, caseNo]
  );
  useEffect(() => {
    if (businessNo && caseNo && tenant.isTH()) {
      dispatch({
        type: 'envoyController/getEnvoyInfo',
        payload: {
          caseNo,
        },
      });
    }
  }, [businessNo, caseNo, dispatch]);
  useEffect(() => {
    handleRefreshPremium(signal);
  }, [signal, handleRefreshPremium]);
  return (
    (!!settlementReason || !!isShow) && (
      <>
        <Alert
          message={
            <>
              <div>
                {formatMessageApi({
                  Dropdown_POL_SettlementReason: settlementReason,
                })}
              </div>
              <div>
                {isShow
                  ? formatMessageApi({
                      [typeCode]: dictCode,
                    })
                  : ''}
              </div>
            </>
          }
          className={styles.alert}
          type={premiumType === PremiumType.PremiumRefund ? 'error' : 'warning'}
          showIcon
        />
      </>
    )
  );
};
WarningMessage.displayName = 'WarningMessage';
export default WarningMessage;
