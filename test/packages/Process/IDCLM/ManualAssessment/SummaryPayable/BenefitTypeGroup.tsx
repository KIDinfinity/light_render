import React, { useMemo } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { mapToBenefitTypeNew } from '../_models/functions/utils';
import PolicyNode from './PolicyNode';
import BenefitType from './BenefitType';
import styles from './BenefitType.less';

const BenefitTypeGroup = ({ data, policyItem, isLabel, showPolicy, expand }: any) => {
  const treatmentPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.treatmentPayableListMap
  );

  const accidentBenefitPayableMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.accidentBenefitPayableListMap
  );

  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );

  const mapKeys = useMemo(
    () => ({
      [eBenefitCategory.Cashless]: treatmentPayableListMap,
      [eBenefitCategory.Aipa]: accidentBenefitPayableMap,
      [eBenefitCategory.Reimbursement]: serviceItemPayableListMap,
    }),
    [treatmentPayableListMap, accidentBenefitPayableMap, serviceItemPayableListMap]
  );

  const benefitTypeData = mapToBenefitTypeNew({ source: data, mapKeys });

  const existBenefitType = lodash
    .chain(benefitTypeData)
    .map((item) => formUtils.queryValue(item?.benefitTypeCode))
    .uniq()
    .value();

  return (
    <div className={styles.benefitTypeGroup}>
      <PolicyNode
        policyNo={policyItem?.policyNo}
        policyCurrency={policyItem?.policyCurrency}
        key={policyItem?.policyNo}
        expand={expand}
        isLabel={isLabel}
        showPolicy={showPolicy}
      >
        {lodash.map(benefitTypeData, (item, key) => (
          <BenefitType
            benefitTypeData={item}
            key={`groupBy${key}`}
            expand={expand}
            existBenefitType={existBenefitType}
          />
        ))}
      </PolicyNode>
    </div>
  );
};

export default BenefitTypeGroup;
