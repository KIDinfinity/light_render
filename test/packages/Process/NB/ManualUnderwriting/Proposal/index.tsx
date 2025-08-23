import React from 'react';
import NBEntrance from 'bpm/pages/OWBEntrance/Entrance/NB';
import CustomerIdentificationModal from './CustomerIdentificationModal';
import SetTaskDetail from './SetTaskDetail';
import Steps from './Steps';
import useGetDiffSourceSnapshot from 'process/NB/ManualUnderwriting/_hooks/useGetDiffSourceSnapshot';
import useGetRenewalPaymentMethod from 'process/NB/ManualUnderwriting/_hooks/useGetRenewalPaymentMethod';
import useHandleCoreDataInit from './useHandleCoreDataInit';
import useGetBankCodeFilterList from 'process/NB/ManualUnderwriting/_hooks/useGetBankCodeFilterList';
import useChangeBankInfoBankName from 'process/NB/ManualUnderwriting/_hooks/useChangeBankInfoBankName';
import useLoadProposalFlag from 'process/NB/ManualUnderwriting/_hooks/useLoadProposalFlag';
import useGetListDedupCheckCfg from 'process/NB/ManualUnderwriting/_hooks/useGetListDedupCheckCfg';
import useGetCfgPlanHospitalBenefit from 'process/NB/ManualUnderwriting/_hooks/useGetCfgPlanHospitalBenefit';
import useProposalHasQuestionnaire from 'process/NB/components/AgentQuestionnaire/hooks/useProposalHasQuestionnaire';
import useLoadPlanDictProductRegion from 'process/NB/ManualUnderwriting/_hooks/useLoadPlanDictProductRegion';
import useLoadSustaibalitySnapshot from 'process/NB/ManualUnderwriting/_hooks/useLoadSustaibalitySnapshot';
import Chart from 'process/NB/ManualUnderwriting/Fund/Chart';
import CaseContainer from 'basic/components/CaseContainer';
import PageContainer from 'basic/components/Elements/PageContainer';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';
import useLoadBankDropdown from 'process/NB/ManualUnderwriting/_hooks/useLoadBankDropdown';

const Proposal = ({ businessData, originBizData, taskDetail }: any) => {
  useHandleCoreDataInit({ businessData, originBizData, taskDetail });
  useGetDiffSourceSnapshot();
  useGetRenewalPaymentMethod();
  useGetBankCodeFilterList();
  useChangeBankInfoBankName();
  useLoadProposalFlag();
  useGetListDedupCheckCfg();
  useGetCfgPlanHospitalBenefit();
  useProposalHasQuestionnaire();
  useLoadPlanDictProductRegion();
  useLoadSustaibalitySnapshot();
  const { caseCategory, activityKey } = useGetCaseDetail();
  useLoadBankDropdown(businessData?.submissionChannel);
  return (
    <>
      <PageContainer pageConfig={{ caseCategory, activityCode: activityKey }}>
        <Steps businessData={businessData} taskDetail={taskDetail} />
        <CustomerIdentificationModal />
        <SetTaskDetail taskDetailSource={taskDetail} />
        <Chart />
      </PageContainer>
    </>
  );
};

export default () => {
  return (
    <CaseContainer>
      <NBEntrance>
        <Proposal />
      </NBEntrance>
    </CaseContainer>
  );
};
