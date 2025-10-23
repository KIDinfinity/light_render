import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './info.less';
import { ReferenceModel } from 'claim/pages/360/enum';
import useGetReferenceModel from 'claim/components/ReferenceModelProvider/hooks/useGetReferenceModel';

export default ({ policyInfo }: any) => {
  const referenceModel = useGetReferenceModel();
  const isSummaryPageModel = referenceModel === ReferenceModel.SummaryPage;
  return (
    <div className={isSummaryPageModel ? styles.summaryPageInfo : styles.info}>
      <div className={styles.PolicyNoCode}>{policyInfo?.policyId}</div>
      <div className={styles.personal}>
        {formatMessageApi({ Dropdown_PRD_Product: policyInfo?.mainProductCode })}
      </div>
    </div>
  );
};
