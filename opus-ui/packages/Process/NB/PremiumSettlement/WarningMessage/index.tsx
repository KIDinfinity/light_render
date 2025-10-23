import React from 'react';
import { useSelector } from 'dva';
import { Icon } from 'antd';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const WarningMessage = () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  const settlementReason = lodash.get(businessData, 'policyList[0].settlementReason');
  return (
    <>
      {/* {!lodash.isEmpty(settlementReason) ? ( */}
      <div className={styles.wrap}>
        <div className={styles.warningIcon}>
          <Icon type="warning" className={styles.warning} />
        </div>
        <div className={styles.warningMessage}>
          <span>
            {formatMessageApi({
              Dropdown_POL_SettlementReason: settlementReason,
            })}
          </span>
        </div>
      </div>
      {/* ) : null} */}
    </>
  );
};
WarningMessage.displayName = 'WarningMessage';
export default WarningMessage;
