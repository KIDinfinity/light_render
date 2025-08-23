import React, { useEffect } from 'react';
import { useSelector, connect } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import useSetBizData from 'process/NB/ManualUnderwriting/_hooks/useSetBizData';
import useGetOriginTaskDetail from 'process/NB/ManualUnderwriting/_hooks/useGetOriginTaskDetail';
import useSetNtuData from 'process/NB/ManualUnderwriting/_hooks/useSetNtuData';
import useLoadFieldsCustomerTypeConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadFieldsCustomerTypeConfig';
import useLoadClientsQuestionnaire from 'process/NB/ManualUnderwriting/_hooks/useLoadClientsQuestionnaire';
import { NAMESPACE } from './activity.config';
import Layout from './Layout';
import Client from './Client';
import ReButton from './ReButton';
import Decision from './Decision/Show';
import Fund from './Fund/ReadOnly';
import ErrorMessage from './ErrorMessage';
import PolicyReplacement from './PolicyReplacement/ReadOnly';
import DistributionChannel from './DistributionChannel/ReadOnly';
import PlanInfo from './PlanInfo';
import PolicyNo from './PolicyNo';
import TakeOver from './TakeOver';
import Loan from 'basic/components/Loan';
import useLoadProductionConfigByContractType from 'process/NB/ManualUnderwriting/_hooks/useLoadProductionConfigByContractType';
import PageContainer from 'basic/components/Elements/PageContainer';
import useHandleEnvoyChange from 'process/NB/ManualUnderwriting/_hooks/useHandleEnvoyChange';
import useSetInitialBusinessData from 'process/NB/ManualUnderwriting/_hooks/useSetInitialBusinessData';
import useLoadDefaultCurrentAddressConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadDefaultCurrentAddressConfig';
import useGetLoanDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetLoanDetailList';
import Chart from 'process/NB/ManualUnderwriting/Fund/Chart';
import useGetNationality from 'process/NB/ManualUnderwriting/_hooks/useGetNationality';
import useLoadRegionalDefaultValueList from 'process/NB/ManualUnderwriting/_hooks/useLoadRegionalDefaultValueList';
import useLoadUWMeLinkAge from 'process/NB/ManualUnderwriting/_hooks/useLoadUWMeLinkAge';
import useLoadUWMELinkRule from 'process/NB/ManualUnderwriting/_hooks/useLoadUWMELinkRule';
import useHandleChequeUpdate from 'process/NB/Share/hooks/useHandleChequeUpdate';
import useInitChequeInfoListFromBizData from 'process/NB/Share/hooks/useInitChequeInfoListFromBizData';
import useClearChequeInfoBeforeLeave from 'process/NB/Share/hooks/useClearChequeInfoBeforeLeave';
import useAutoRefreshPermiiumData from 'process/NB/ManualUnderwriting/_hooks/useAutoRefreshPermiiumData';
import useLoadRegionalDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useLoadRegionalDefaultValue';
import useGetCfgPlanHospitalBenefit from 'process/NB/ManualUnderwriting/_hooks/useGetCfgPlanHospitalBenefit';
import useLoadSustaibalitySnapshot from 'process/NB/ManualUnderwriting/_hooks/useLoadSustaibalitySnapshot';
import RuleResultsModel from './RuleResultsModel';
import PostQCModal from './PostQCModal';
import useFindNewestEwsByOperationType from 'process/NB/ManualUnderwriting/_hooks/useFindNewestEwsByOperationType';
import MedicalRequestModal from 'navigator/components/CaseTaskDetail/MedicalRequestModal';
import useLoadCfgLoadingMappingUIRule from 'process/NB/ManualUnderwriting/_hooks/useLoadCfgLoadingMappingUIRule';
import useLoadIdDisplayConfigList from 'process/NB/ManualUnderwriting/_hooks/useLoadIdDisplayConfigList';
import useLoadPolicyLevelFecRiskMsg from 'process/NB/ManualUnderwriting/_hooks/useLoadPolicyLevelFecRiskMsg';
import useAutoLoadTakeOverProduct from 'process/NB/ManualUnderwriting/_hooks/useAutoLoadTakeOverProduct';
import useHandleChangeDataPiorityCallback from 'basic/components/DataPriorityContainer/hooks/useHandleChangeDataPiorityCallback';
import useLoadCitiesByCountry from 'process/NB/ManualUnderwriting/_hooks/useLoadCitiesByCountry';
import useSetVoiceRecord from 'process/NB/ManualUnderwriting/_hooks/useSetVoiceRecord';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';
import DataPriority from 'enum/DataPriority';
import TransferPayment from './TransferPayment';
import getCommonCaseCategoryAndActivityCode from 'basic/components/Elements/getCommonCaseCategoryAndActivityCode';
import useLoadBankDropdown from 'process/NB/ManualUnderwriting/_hooks/useLoadBankDropdown';
import NetworkCheck from '@/components/NetworkCheck';
import VoiceRecord from './VoiceRecord';

const ManualUnderwriting = ({ businessData, taskDetail }: any) => {
  useInitChequeInfoListFromBizData({ businessData });
  useHandleChequeUpdate({ businessData });
  useAutoLoadTakeOverProduct({ businessData });
  useLoadUWMELinkRule();
  useLoadIdDisplayConfigList();
  useGetNationality();
  useLoadRegionalDefaultValueList();
  useLoadUWMeLinkAge();
  useSetNtuData({
    businessData,
  });
  useSetBizData({
    businessData,
  });
  useSetVoiceRecord({
    businessData,
  });
  useGetOriginTaskDetail({
    taskId: lodash.last(window.location.pathname.split('/')),
    dataType: 'mainPage',
    skipSnapshot: true,
  });
  const { caseCategory, activityKey } = useGetCaseDetail();
  const originBizData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.originBizData,
    shallowEqual
  );

  useLoadClientsQuestionnaire({
    businessNo: taskDetail?.businessNo,
    caseCategory: businessData?.caseCategory,
  });
  const commonCaseCategoryAndActivityCode = getCommonCaseCategoryAndActivityCode({
    caseCategory,
    activityCode: activityKey,
  });
  const customerAtomConfigKey = (() => {
    if (commonCaseCategoryAndActivityCode.caseCategory) {
      return `${commonCaseCategoryAndActivityCode.caseCategory}_BP_NB_ACT004`;
    }
    return false;
  })();
  useLoadFieldsCustomerTypeConfig({
    atomGroupCode: customerAtomConfigKey,
  });

  const disabledAtomConfigKey = (() => {
    if (commonCaseCategoryAndActivityCode.caseCategory) {
      return `${commonCaseCategoryAndActivityCode.caseCategory}_BP_NB_ACT004_disable_condition`;
    }
    return false;
  })();
  useLoadFieldsCustomerTypeConfig({
    atomGroupCode: disabledAtomConfigKey,
  });

  useLoadProductionConfigByContractType();
  useHandleEnvoyChange();
  useSetInitialBusinessData({ businessData: originBizData });
  useLoadDefaultCurrentAddressConfig();
  useAutoRefreshPermiiumData({
    businessData,
  });
  const loanList = useGetLoanDetailList();
  useClearChequeInfoBeforeLeave();
  useLoadCfgLoadingMappingUIRule();
  useLoadRegionalDefaultValue({ codeType: 'NonIndicatorFatca' });
  useLoadRegionalDefaultValue({ codeType: 'callNanoRetrieveProposalToken' });
  useLoadRegionalDefaultValue({ codeType: 'supportTransferPayment' });
  useGetCfgPlanHospitalBenefit();
  useLoadSustaibalitySnapshot();
  useFindNewestEwsByOperationType({
    applicationNo: taskDetail?.businessNo,
    operationType: 'case.appeal',
  });
  useLoadPolicyLevelFecRiskMsg({
    businessData,
  });
  useLoadCitiesByCountry();
  const handleChangePriority = useHandleChangeDataPiorityCallback();
  useEffect(() => {
    window.requestIdleCallback(() => {
      handleChangePriority(DataPriority.MEDIUM);
    });
  }, [handleChangePriority]);
  useLoadBankDropdown(businessData?.submissionChannel);
  return (
    <PageContainer pageConfig={{ caseCategory, activityCode: activityKey }}>
      <NetworkCheck />
      <Layout>
        <ErrorMessage />
        <PolicyNo />
        <Client mode="show" />
        <PlanInfo />
        <ReButton />
        <Decision />
        <Fund />
        <TakeOver />
        <Loan expand loanList={loanList} NAMESPACE={NAMESPACE} tooltip trigger="click" />
        <PolicyReplacement />
        <VoiceRecord />
        <DistributionChannel />
      </Layout>
      <Chart />
      <RuleResultsModel NAMESPACE={NAMESPACE} />
      <MedicalRequestModal />
      <PostQCModal />
      <TransferPayment />
    </PageContainer>
  );
};

export default connect()(setClaimEditableHoc(setInsured360Hoc(ManualUnderwriting)));
