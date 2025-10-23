import React from 'react';
import lodash from 'lodash';
import useGetDecisionColumnsMW from '../../_hooks/useGetDecisionColumnsMW';
import useGetFieldOrderAtomConfigCallback from 'basic/components/Elements/hooks/useGetFieldOrderAtomConfigCallback';
import CustomisationCol from 'basic/components/CustomisationCol';
import styles from './index.less';

const CoverageTableHeader = () => {
  const decisionColumns = useGetDecisionColumnsMW();
  const handleGetOrder = useGetFieldOrderAtomConfigCallback({
    localConfig: {},
    section: 'UWDecision-Table',
  });
  return (
    <div className={styles.product}>
      <div className={styles.fieDecision}>
        {lodash.map(decisionColumns, (item, index) => (
          <CustomisationCol
            key={index}
            span={item?.span}
            order={handleGetOrder({ field: item?.key })}
          >
            {item?.title}
          </CustomisationCol>
        ))}
      </div>
    </div>
  );
};

export default CoverageTableHeader;
