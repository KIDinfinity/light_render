import React from 'react';
import lodash from 'lodash';
import BenefitTypeItem from './Item';
import useGetBenefitTypeList from './useGetBenefitTypeList';
import { formUtils } from 'basic/components/Form';

import styles from './index.less';

export default ({ payableIds, expand, isLabel }: any) => {
  const benefitTypeList = useGetBenefitTypeList({ payableIds });
  const existBenefitType = lodash
    .chain(benefitTypeList)
    .map((item) => formUtils.queryValue(item?.basic?.benefitTypeCode))
    .uniq()
    .value();

  return (
    <div className={styles.benefitTypeList}>
      {lodash.map(benefitTypeList, (item) => (
        <BenefitTypeItem
          benefitTypeItem={item}
          key={item.key}
          existBenefitType={existBenefitType}
          expand={expand}
          isLabel={isLabel}
        />
      ))}
    </div>
  );
};
