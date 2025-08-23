import React from 'react';
import { useSelector } from 'dva';
import { Icon, Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as laPolicyStatusWarning } from 'process/assets/laPolicyStatusWarning.svg';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from './index.less';

const LAStatus = () => {
  const laPolicyStatus = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.laPolicyStatus
  );

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {formatMessageApi({
          Label_BIZ_Policy: 'LAStatus',
        })}
      </div>
      {laPolicyStatus ? (
        <div className={styles.value}>
          {formatMessageApi({ Dropdown_POL_PolicyStatusCode: laPolicyStatus })}
        </div>
      ) : (
        <div className={styles.value}>
          <Tooltip
            overlayClassName={styles.tooltipBg}
            title={formatMessageApi({ Label_COM_WarningMessage: 'MSG_000679' })}
          >
            <Icon component={laPolicyStatusWarning} />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

LAStatus.displayName = 'LAStatus';
export default LAStatus;
