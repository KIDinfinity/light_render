import React from 'react';
import { Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PolicyBoItem from './PolicyBoItem';
import { useSelector } from 'dva';
import lodash from 'lodash';
import styles from './PolicyList.less';

const Policy = () => {
  const { policyOwnerBOList, policyPayorBOList } = useSelector(
    ({ daOfClaimAssessmentController }: any) => ({
      policyOwnerBOList: daOfClaimAssessmentController?.claimProcessData?.policyOwnerBOList || [],
      policyPayorBOList: daOfClaimAssessmentController?.claimProcessData?.policyPayorBOList || [],
    })
  );

  const list = [
    {
      type: 'policyOwner',
      data: policyOwnerBOList,
      visible: true,
    },
    {
      type: 'policyPayor',
      data: policyPayorBOList,
      visible: policyPayorBOList && lodash.isEmpty(policyPayorBOList) ? false : true,
    },
  ];

  return list.map(
    (item) =>
      item?.visible && (
        <div className={styles.PolicyListWrap} key={item?.type}>
          <Card
            title={formatMessageApi({
              Label_BIZ_Claim:
                item.type === 'policyOwner'
                  ? 'app.navigator.drawer.pending.form.label.PolicyOwner'
                  : 'Policy Payor',
            })}
            bordered={false}
          >
            {(item?.data || []).map((id: any) => (
              <PolicyBoItem id={id} key={id} type={item?.type} />
            ))}
          </Card>
        </div>
      )
  );
};

export default Policy;
