import React from 'react';
import { connect } from 'dva';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import Steps from './Steps/PaperSubmission';
import useHandleCoreDataInit from './useHandleCoreDataInit';
import useProposalBizData from 'process/NB/ManualUnderwriting/_hooks/useProposalBizData';
import useAutoAddClientItemForProposalCreation from 'process/NB/ManualUnderwriting/_hooks/useAutoAddClientItemForProposalCreation';
import useAutoAddAgentItemForProposalCreation from 'process/NB/ManualUnderwriting/_hooks/useAutoAddAgentItemForProposalCreation';
import useAutoAddCoverageItemForProposalCreation from 'process/NB/ManualUnderwriting/_hooks/useAutoAddCoverageItemForProposalCreation';

const PaperSubmission = ({ businessData, originBizData, taskDetail }: any) => {
  useHandleCoreDataInit({
    businessData,
    originBizData,
    taskDetail,
  });

  useProposalBizData({ businessData });
  useAutoAddClientItemForProposalCreation();
  useAutoAddAgentItemForProposalCreation();
  useAutoAddCoverageItemForProposalCreation();
  return <Steps />;
};

export default connect()(setClaimEditableHoc(setInsured360Hoc(PaperSubmission)));
