import React from 'react';
import Steps from '../ManualUnderwriting/Proposal/Steps';

import useGetDiffSourceSnapshot from 'process/NB/ManualUnderwriting/_hooks/useGetDiffSourceSnapshot';
import useGetRenewalPaymentMethod from 'process/NB/ManualUnderwriting/_hooks/useGetRenewalPaymentMethod';
import useGetBankCodeFilterList from 'process/NB/ManualUnderwriting/_hooks/useGetBankCodeFilterList';
import useChangeBankInfoBankName from 'process/NB/ManualUnderwriting/_hooks/useChangeBankInfoBankName';
import useLoadProposalFlag from 'process/NB/ManualUnderwriting/_hooks/useLoadProposalFlag';
import useGetListDedupCheckCfg from 'process/NB/ManualUnderwriting/_hooks/useGetListDedupCheckCfg';
import useGetCfgPlanHospitalBenefit from 'process/NB/ManualUnderwriting/_hooks/useGetCfgPlanHospitalBenefit';
import useProposalHasQuestionnaire from 'process/NB/components/AgentQuestionnaire/hooks/useProposalHasQuestionnaire';
import useLoadPlanDictProductRegion from 'process/NB/ManualUnderwriting/_hooks/useLoadPlanDictProductRegion';
import useLoadSustaibalitySnapshot from 'process/NB/ManualUnderwriting/_hooks/useLoadSustaibalitySnapshot';
import PageContainer from 'basic/components/Elements/PageContainer';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';
import useLoadProductionConfigByContractType from 'process/NB/ManualUnderwriting/_hooks/useLoadProductionConfigByContractType';
import useSetInitialBusinessData from 'process/NB/ManualUnderwriting/_hooks/useSetInitialBusinessData';
import useGetNationality from 'process/NB/ManualUnderwriting/_hooks/useGetNationality';
import useLoadRegionalDefaultValueList from 'process/NB/ManualUnderwriting/_hooks/useLoadRegionalDefaultValueList';
import useLoadAddressList from 'process/NB/ManualUnderwriting/_hooks/useLoadAddressList';
import useLoadIdDisplayConfigList from 'process/NB/ManualUnderwriting/_hooks/useLoadIdDisplayConfigList';
import useLoadPolicyLevelFecRiskMsg from 'process/NB/ManualUnderwriting/_hooks/useLoadPolicyLevelFecRiskMsg';
import useProposalBizData from 'process/NB/ManualUnderwriting/_hooks/useProposalBizData';
import useGetOriginTaskDetail from 'process/NB/ManualUnderwriting/_hooks/useGetOriginTaskDetail';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from './activity.config';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import useLoadFieldsCustomerTypeConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadFieldsCustomerTypeConfig';
import useLoadBankDropdown from '../ManualUnderwriting/_hooks/useLoadBankDropdown';

const DataCollector = ({ taskDetail, businessData }: any) => {
  useProposalBizData({ businessData });
  useGetOriginTaskDetail({
    taskId: lodash.last(window.location.pathname.split('/')),
    dataType: 'mainPage',
    skipSnapshot: true,
  });
  const originBizData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.originBizData,
    shallowEqual
  );

  useSetInitialBusinessData({ businessData: originBizData });
  useLoadAddressList({
    businessData,
  });
  useLoadPolicyLevelFecRiskMsg({ businessData });
  useGetNationality();
  useLoadRegionalDefaultValueList();
  useLoadIdDisplayConfigList();
  useLoadProductionConfigByContractType();
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

  useLoadFieldsCustomerTypeConfig({
    atomGroupCode: `${businessData?.caseCategory}_BP_PAPER_ACT001`,
  });

  useLoadBankDropdown(businessData?.submissionChannel);

  const { caseCategory, activityKey } = useGetCaseDetail();
  return (
    <PageContainer pageConfig={{ caseCategory, activityCode: activityKey }}>
      <Steps businessData={businessData} taskDetail={taskDetail} />
    </PageContainer>
  );
};

export default connect()(setClaimEditableHoc(setInsured360Hoc(DataCollector)));
