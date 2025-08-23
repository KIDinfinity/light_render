import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import styles from './clientNames.less';
import { Tooltip } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetClientNameByConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetinsuredRoleByClientId from 'process/NB/ManualUnderwriting/_hooks/useGetinsuredRoleByClientId';
import useGetSustainabilityCaseCheckStatus from 'process/NB/ManualUnderwriting/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetRelateJointLifeCoverageInsuredId from 'process/NB/ManualUnderwriting/_hooks/useGetRelateJointLifeCoverageInsuredId';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ item }: any) => {
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  const clientInfoList = useGetClientDetailList();
  const { checking } = useGetSustainabilityCaseCheckStatus();
  const jointClientIds = useGetRelateJointLifeCoverageInsuredId({
    coreCode: formUtils.queryValue(item?.coreCode),
  });

  const jointClientNames = useSelector((state) => {
    const policyList = state[NAMESPACE].businessData.policyList;
    return jointClientIds.map((clientId) => {
      for (const policy of policyList) {
        const clientInfo = policy.clientInfoList.find((client: any) => client.id === clientId);
        if (clientInfo) return handleGetDefaultClientName({ clientInfo });
      }
      return clientId;
    });
  }, shallowEqual);

  return (
    <>
      {lodash.map(item?.coverageInsuredList, (e: any) => {
        const clientInfo = lodash
          .chain(clientInfoList)
          .find((el: any) => el?.id === e?.clientId)
          .value();
        const clientName = (() => {
          return handleGetDefaultClientName({
            clientInfo,
          });
        })();
        const insuredRole = useGetinsuredRoleByClientId({ clientId: e?.clientId });
        const tooltipTitle = (() => {
          return (
            <>
              <div>{clientName}</div>
              <div className={styles.role}>
                {formatMessageApi({ Dropdown_POL_InsuredRole: insuredRole })}
              </div>
            </>
          );
        })();
        return (
          <div
            key={e?.id}
            className={classnames(styles.name, {
              [styles.increasedName]: lodash.get(item, 'systemAutoAddInd') === 'Y',
              [styles?.rtCoverageFlag]: item?.rtCoverageFlag && checking,
            })}
          >
            <Tooltip title={tooltipTitle} placement="right">
              {clientName}
            </Tooltip>
          </div>
        );
      })}
      {lodash.map(jointClientNames, (clientName: string, index: number) => {
        const tooltipTitle = (() => {
          return (
            <>
              <div>{clientName}</div>
              <div className={classnames(styles.role, styles.jointLife)}>
                {formatMessageApi({ Dropdown_POL_InsuredRole: 'UI' })}
              </div>
            </>
          );
        })();
        return (
          <div
            key={'jointLife' + index}
            className={classnames(styles.name, {
              [styles.increasedName]: lodash.get(item, 'systemAutoAddInd') === 'Y',
              [styles?.rtCoverageFlag]: item?.rtCoverageFlag && checking,
            })}
          >
            <Tooltip title={tooltipTitle} placement="right">
              {clientName}
            </Tooltip>
          </div>
        );
      })}
    </>
  );
};
