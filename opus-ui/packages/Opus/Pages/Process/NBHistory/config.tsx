import React from 'react';
import CaseCategory from 'enum/CaseCategory';

import THNBHistory from 'packages/Opus/NewBusiness/ManualUnderwriting';

import { NAMESPACE as THNewBusinessManualUnderwritingNAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default [
  {
    caseCategory: [
      CaseCategory.BP_NB_CTG001,
      CaseCategory.BP_NB_CTG003,
      CaseCategory.BP_AP_CTG02,
      CaseCategory.BP_NB_CTG005,
      CaseCategory.VN_UW_CTG001,
      CaseCategory.BP_NB_CTG002,
      CaseCategory.BP_AP_CTG03,
      CaseCategory.NB_UW_CTG001,
      CaseCategory.NB_UW_CTG005,
      CaseCategory.NB_UW_CTG006,
      CaseCategory.BP_UW_CTG003,
    ],
    initEffect: 'getCaseDetails',
    NAMESPACE: THNewBusinessManualUnderwritingNAMESPACE,
    component: (props: any) => <THNBHistory {...props} />,
  },
];
