import React from 'react';
import useGetinsuredRoleByClientId from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetinsuredRoleByClientId';
import styles from './index.less';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetClientNameByConfigCallback from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetClientNameByConfigCallback';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classnames from 'classnames';
import lodash from 'lodash';
import { Tooltip } from 'antd';

const NameText: React.FC = (props) => {
  const { clientId, item, checking } = props;
  const clientMap = useSelector((state) => state[NAMESPACE].entities?.clientMap, shallowEqual);
  const clientInfo = clientMap[clientId]?.personalInfo;
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  const clientName = (() => {
    return handleGetDefaultClientName({
      clientInfo,
    });
  })();
  const insuredRole = useGetinsuredRoleByClientId({ clientId });
  const tooltipTitle = (() => {
    return (
      <>
        <div>{clientName || item?.clientName}</div>
        <div className={styles.role}>
          {formatMessageApi({ Dropdown_POL_InsuredRole: insuredRole })}
        </div>
      </>
    );
  })();
  return (
    <div
      className={classnames(styles.name, {
        [styles.increasedName]: lodash.get(item, 'systemAutoAddInd') === 'Y',
        [styles?.rtCoverageFlag]: item?.rtCoverageFlag && checking,
      })}
    >
      <Tooltip title={tooltipTitle} placement="right">
        {clientName || item?.clientName}
      </Tooltip>
    </div>
  );
};

export default NameText;
