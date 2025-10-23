import React from 'react';
import { useSelector } from 'dva';
import { getYearSuffix } from 'process/Utils';
import styles from './PolicyComponent.less';

const PolicyComponent = ({ policyNo, policyYear, policyCurrency }: any) => {
  const borderColor = useSelector(
    ({ formCommonController }: any) =>
      formCommonController?.policyBackgrounds?.[`${policyNo}${policyYear}`]
  );

  const styles1 = /var/.test(borderColor)
    ? {
        borderImage: borderColor,
        borderImageWidth: '0 100% 2px 0',
      }
    : { borderColor };

  return (
    <div className={styles.policyComponent}>
      <span className={styles.policy} style={styles1}>
        {policyYear
          ? `${policyNo} ${policyCurrency} (${getYearSuffix(Number(policyYear))} Policy Year)`
          : policyNo}
      </span>
    </div>
  );
};

export default PolicyComponent;
