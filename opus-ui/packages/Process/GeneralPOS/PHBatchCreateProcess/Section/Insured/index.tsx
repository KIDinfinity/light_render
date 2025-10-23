import React from 'react';
import Item from './Item';
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { useSelector } from 'dva';
import NonCftLabel from 'process/GeneralPOS/common/NonCftLabel';

import lodash from 'lodash';
const Insured = () => {
  const policyInfo = useSelector(
    (state) => state.PHBatchCreateProcessController?.processData?.policyInfo
  );
  const mainInsuredClientId = policyInfo?.mainInsuredClientId;
  const clientInfoList = policyInfo?.clientInfoList;
  const { vip } =
    lodash.find(clientInfoList, (item) => item.clientId === mainInsuredClientId) || {};
  return (
    <div className={styles.insured}>
      <FormAntCard
        title={
          <div>
            {vip === '1' ? (
              <div className={styles.insuredTitle}>
                <span>
                  {formatMessageApi({
                    Label_BIZ_Claim:
                      'venus_claim.phowb.dataCapture.label.policyOwnerInformation.insuredInformation',
                  })}
                </span>
                <span>
                  <NonCftLabel />
                </span>
              </div>
            ) : (
              formatMessageApi({
                Label_BIZ_Claim:
                  'venus_claim.phowb.dataCapture.label.policyOwnerInformation.insuredInformation',
              })
            )}
          </div>
        }
      >
        <Item />
      </FormAntCard>
    </div>
  );
};

export default Insured;
