import React from 'react';
import CaseCategory from 'enum/CaseCategory';

import POSHistory from 'opus/Pages/Process/POS/BaseProduct/page';

import { NAMESPACE as POSManualAssessmentNAMESPACE } from 'opus/Pages/Process/POS/ManualAssessment/activity.config';
import PageContainer from 'basic/components/Elements/PageContainer';

export default [
  {
    caseCategory: [
      CaseCategory.HK_PAPER_CTG001,
      CaseCategory.HK_POS_CTG001,
      'HK_POS_CTG003',
      'BP_POS_CTG011',
      'BP_CDD_CTG001',
    ],
    initEffect: 'getCaseDetails',
    NAMESPACE: POSManualAssessmentNAMESPACE,
    component: (props: any) => (
      <PageContainer pageConfig={{}}>
        <POSHistory {...props} />
      </PageContainer>
    ),
  },
];
