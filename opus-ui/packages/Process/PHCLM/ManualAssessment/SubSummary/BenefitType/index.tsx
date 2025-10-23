import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { FormBorderCard } from 'basic/components/Form';
import getPolicyYearValue from 'process/PHCLM/ManualAssessment/_models/functions/getPolicyYearValue';
import BenefitItem from '../BenefitItem';
import useGetBenefitItemList from './useGetBenefitItemList';
import styles from './index.less';

const BenefitType = ({ benefitTypeItem }: any) => {
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const data: any = useGetBenefitItemList(benefitTypeItem?.children);

  return (
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
  );
};

export default BenefitType;
