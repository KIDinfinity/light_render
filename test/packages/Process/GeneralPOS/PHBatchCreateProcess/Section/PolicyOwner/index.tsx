import React from 'react';
import Item from './Item';
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { useSelector } from 'dva';
import NonCftLabel from 'process/GeneralPOS/common/NonCftLabel';
import lodash from 'lodash';

const PolicyOwner = () => {
  const { policyInfo, mainPolicyId } = useSelector(
    (state) => state.PHBatchCreateProcessController?.processData
  );
  const clientId = lodash.find(
    policyInfo?.policyOwnerList,
    (item: any) => item.policyId === mainPolicyId
  )?.clientId;
  const { vip } =
    lodash.find(policyInfo?.clientInfoList, (item) => item.clientId === clientId) || {};
  return (
    <div className={styles.PolicyOwner}>
      <FormAntCard
        title={
          <div>
            {vip === '1' ? (
              <div className={styles.policyOwnerInfoTitle}>
                <span>
                  {formatMessageApi({
                    Label_BIZ_Claim:
                      'venus_claim.phowb.dataCapture.label.policyOwnerInformation.title',
                  })}
                </span>
                <span>
                  <NonCftLabel />
                </span>
              </div>
            ) : (
              formatMessageApi({
                Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.policyOwnerInformation.title',
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

export default PolicyOwner;
