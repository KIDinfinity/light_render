import React from 'react';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './card.less';
import { ReferenceModel } from 'claim/pages/360/enum';
import useGetReferenceModel from 'claim/components/ReferenceModelProvider/hooks/useGetReferenceModel';

export default ({ children }: any) => {
  const referenceModel = useGetReferenceModel();
  const isSummaryPageModel = referenceModel === ReferenceModel.SummaryPage;
  return (
    <div className={isSummaryPageModel ? styles.summaryPageBg : styles.bg}>
      <div className={styles.policy}>
        <div className={styles.policyno}>{formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' })}</div>
        {children}
      </div>
    </div>
  );
};
