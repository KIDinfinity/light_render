import React from 'react';
import { useSelector } from 'dva';
import styles from './PolicyComponent.less';

const PolicyComponent = ({ policyNo, policyCurrency }: any) => {
  const borderColor = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds?.[policyNo]
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
        {policyNo}
      </span>
      <span className={styles.currency}>{policyCurrency}</span>
    </div>
  );
};

export default PolicyComponent;
