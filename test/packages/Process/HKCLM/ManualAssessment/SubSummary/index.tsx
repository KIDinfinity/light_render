import React from 'react';
import lodash from 'lodash';
import BenefitType from './BenefitType';
import useGetBenefitTypeList from './useGetBenefitTypeList';
import styles from './index.less';

const SubSummary = ({ treatmentId }: any) => {
  const benefitTypeList = useGetBenefitTypeList({ treatmentId });

  return (
    <div className={styles.summaryPayable}>
      {lodash.map(benefitTypeList, (item: any) => (
        <BenefitType benefitTypeItem={item} key={item?.key} />
      ))}
    </div>
  );
};

export default SubSummary;
