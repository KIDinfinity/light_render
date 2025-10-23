import React from 'react';
import { NAMESPACE } from '../../activity.config';
import { eClaimDecision } from 'claim/enum/claimDecision';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import getPolicyYearValue from 'process/HKCLM/ManualAssessment/_models/functions/getPolicyYearValue';
import BenefitItem from '../BenefitItem';
import useGetBenefitItemList from './useGetBenefitItemList';
import styles from './index.less';

const BenefitType = ({ benefitTypeItem }: any) => {
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const claimDecision = formUtils.queryValue(
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace.claimProcessData?.claimDecision?.assessmentDecision
    )
  );

  const data: any = useGetBenefitItemList(benefitTypeItem?.children);

  return (
    (((claimDecision !== eClaimDecision.deny &&
      benefitTypeItem.claimDecision !== eClaimDecision.deny &&
      benefitTypeItem.claimDecision !== eClaimDecision.na) ||
      benefitTypeItem.benefitCategory === eBenefitCategory.Reimbursement) && (
      <FormBorderCard
        type="weight"
        className={styles.benefitType}
        borderColor={
          policyBackgrounds?.[`${benefitTypeItem?.policyNo}${getPolicyYearValue(benefitTypeItem)}`]
        }
      >
        {lodash.map(data, (item: any) => (
          <BenefitItem benefitItemItem={item} key={item?.key} />
        ))}
      </FormBorderCard>
    )) || <></>
  );
};

export default BenefitType;
