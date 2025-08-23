import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import BenefitTypeGroup from './BenefitTypeGroup';
import styles from './BenefitType.less';

const SummaryPayable = ({ incidentId, isLabel, showPolicy, expand }: any) => {
  const dispatch = useDispatch();

  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap
  );

  const policyNoList = lodash
    .chain(claimPayableListMap)
    .filter((item: any) => item?.incidentId === incidentId && item?.booster !== 'Y')
    // .concat(noMap)
    .map((item) => ({
      ...item,
      policyNo: formUtils.queryValue(item?.policyNo),
    }))
    .groupBy('policyNo')
    .map((item, key) => ({
      policyNo: key,
      groupBy: item,
      policyCurrency: item?.[0]?.policyCurrency,
      viewOrder: lodash.minBy(item, 'viewOrder')?.viewOrder,
    }))
    .filter((item: any) => item?.policyNo)
    .orderBy('viewOrder')
    .value();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/updatePolicyBackgrounds`,
      payload: {
        policyNoList,
      },
    });
  }, []);

  return (
    <div className={styles.benefitTypeGroupBox}>
      {lodash.map(policyNoList, (item: any) => {
        return (
          <BenefitTypeGroup
            data={item?.groupBy}
            policyItem={item}
            key={item?.policyNo}
            isLabel={isLabel}
            showPolicy={showPolicy}
            expand={expand}
          />
        );
      })}
    </div>
  );
};

export default SummaryPayable;
