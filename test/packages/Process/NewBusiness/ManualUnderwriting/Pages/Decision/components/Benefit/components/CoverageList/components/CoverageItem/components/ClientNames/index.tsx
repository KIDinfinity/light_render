import React, { useMemo } from 'react';
import lodash from 'lodash';
import classnames from 'classnames';

import { formUtils } from 'basic/components/Form';

import styles from './index.less';
import { Tooltip } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetClientNameByConfigCallback from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetClientNameByConfigCallback';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetRelateJointLifeCoverageInsuredId from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/components/CoverageList/_hooks/useGetRelateJointLifeCoverageInsuredId';
import NameText from './NameText';
import useGetSustainabilityCaseCheckStatus from 'process/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

export default ({ item }: any) => {
  const coverageInsuredList = item?.coverageInsuredList;
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  const clientMap = useSelector((state) => state[NAMESPACE].entities?.clientMap, shallowEqual);

  const { checking } = useGetSustainabilityCaseCheckStatus();
  const jointClientIds = useGetRelateJointLifeCoverageInsuredId({
    coreCode: formUtils.queryValue(item?.coreCode),
  });

  const jointClientNames = useMemo(() => {
    return jointClientIds.map((clientId) => {
      const clientInfo = clientMap?.[clientId]?.personalInfo;
      if (clientInfo) return handleGetDefaultClientName({ clientInfo });
      return clientId;
    });
  }, [clientMap, handleGetDefaultClientName, jointClientIds]);

  return (
    <>
      {lodash.map(coverageInsuredList, (e: any) => {
        return <NameText key={e.id} clientId={e?.clientId} item={item} checking={checking} />;
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
