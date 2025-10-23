import React from 'react';
import lodash from 'lodash';

import PolicyNo from './PolicyNo';
import BenefitType from './BenefitType';
import useGetPolicyList from './useGetPolicyList';

import styles from './index.less';

const TotalSummary = ({ incidentId, isLabel, showPolicy, switchOn }: any) => {
  const policyList = useGetPolicyList({ incidentId });

  return (
    <div className={styles.totalSummary}>
      {lodash.map(policyList, (item) => (
        <PolicyNo
          policyItem={item}
          key={item.key}
          isLabel={isLabel}
          showPolicy={showPolicy}
          switchOn={switchOn}
        >
          <BenefitType payableIds={item?.payableIds} isLabel={isLabel} />
        </PolicyNo>
      ))}
    </div>
  );
};

export default TotalSummary;
