import React from 'react';
import pageConfig from 'process/NB/ManualUnderwriting/page.config';
import PageContainer from 'basic/components/Elements/PageContainer';
import useGetBizData from 'summary/hooks/useGetBizData';
import useSetBizData from 'process/NB/ManualUnderwriting/_hooks/useSetBizData';
import NamespaceProvider from 'basic/components/NamespaceProvider';
import Layout from 'process/NB/ManualUnderwriting/SummaryLayout';
import PolicyNo from 'process/NB/ManualUnderwriting/PolicyNo';
import Client from 'process/NB/ManualUnderwriting/Client/Summary';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useLoadFieldsCustomerTypeConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadFieldsCustomerTypeConfig';
import PlanInfo from 'process/NB/ManualUnderwriting/PlanInfo';
import Fund from 'process/NB/ManualUnderwriting/Fund/ReadOnly';
import PolicyReplacement from 'process/NB/ManualUnderwriting/PolicyReplacement/ReadOnly';
import DistributionChannel from 'process/NB/ManualUnderwriting/DistributionChannel/ReadOnly';
import useGetLoanDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetLoanDetailList';
import Loan from 'basic/components/Loan';
import InformationSummary from 'bpm/pages/Information/InformationSummary';
import EnvoySummary from 'bpm/pages/Envoy/EnvoySummary';
import Header from './Header';
import Navigation from './Navigation';
import Export from './Export';
import Decision from 'process/NB/ManualUnderwriting/Decision/Sumamry';
import useLoadRegionalDefaultValueList from 'process/NB/ManualUnderwriting/_hooks/useLoadRegionalDefaultValueList';
import useLoadFieldsDisabledConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadFieldsDisabledConfig';
import useLoadProductionConfigByContractType from 'process/NB/ManualUnderwriting/_hooks/useLoadProductionConfigByContractType';
import useGetNationality from 'process/NB/ManualUnderwriting/_hooks/useGetNationality';
import useAutoRefreshPermiiumData from 'process/NB/ManualUnderwriting/_hooks/useAutoRefreshPermiiumData';
import useLoadUWMELinkRule from 'process/NB/ManualUnderwriting/_hooks/useLoadUWMELinkRule';
import useLoadBankDropdown from 'process/NB/ManualUnderwriting/_hooks/useLoadBankDropdown';

export default () => {
  const businessData = useGetBizData();
  useSetBizData({ businessData });
  useLoadFieldsCustomerTypeConfig({
    atomGroupCode: 'BP_NB_CTG001_BP_NB_ACT004',
  });
  useLoadUWMELinkRule();
  useLoadRegionalDefaultValueList();
  useGetNationality();
  useLoadFieldsDisabledConfig();
  useLoadProductionConfigByContractType();
  const loanList = useGetLoanDetailList();
  useAutoRefreshPermiiumData({
    businessData,
  });
  useLoadBankDropdown(businessData?.submissionChannel);

  return (
    <NamespaceProvider NAMESPACE={NAMESPACE}>
      <PageContainer pageConfig={pageConfig}>
        <Layout>
          <Export />
          <Header />
          <PolicyNo />
          <Client mode="show" />
          <PlanInfo />
          <Decision />
          <Fund />
          <Loan expand loanList={loanList} NAMESPACE={NAMESPACE} tooltip trigger="click" />
          <PolicyReplacement />
          <DistributionChannel />
          <InformationSummary />
          <EnvoySummary />
          <Navigation />
        </Layout>
      </PageContainer>
    </NamespaceProvider>
  );
};
