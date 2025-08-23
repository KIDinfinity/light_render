import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import BenefitItem from './Item';
import useGetBenefitItemList from './useGetBenefitItemList';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { eClaimDecision } from 'claim/enum/claimDecision';
import getPolicyYearValue from 'process/MYCLM/ManualAssessment/_models/functions/getPolicyYearValue';

import styles from './index.less';

export default ({ expand, benefitTypeItem, isPayableEditable }: any) => {
  const { basic } = benefitTypeItem;

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const borderColor =
    policyBackgrounds?.[`${formUtils.queryValue(basic?.policyNo)}${getPolicyYearValue(basic)}`];

  const claimDecision = formUtils.queryValue(basic?.claimDecision);

  const benefitItemList: any = useGetBenefitItemList({ benefitTypeItem });

  return (
    (lodash.size(benefitItemList) > 0 &&
      expand &&
      claimDecision !== eClaimDecision.deny &&
      claimDecision !== eClaimDecision.na && (
        <div className={styles.benefitTypeWeight}>
          <FormBorderCard
            type="weight"
            borderColor={policyBackgrounds?.[`${basic?.policyNo}${getPolicyYearValue(basic)}`]}
          >
            {lodash.map(benefitItemList, (item) => (
              <BenefitItem
                benefitItem={item}
                key={item?.key}
                borderColor={borderColor}
                isPayableEditable={isPayableEditable}
              />
            ))}
          </FormBorderCard>
        </div>
      )) || <></>
  );
};
