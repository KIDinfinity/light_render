import React from 'react';
import { connect } from 'dva';

import useLoadFieldsCustomerTypeConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadFieldsCustomerTypeConfig';
import useLoadFieldsDisabledConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadFieldsDisabledConfig';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';

import { SectionLayout } from 'basic/components/Form';
import PageContainer from 'basic/components/Elements/PageContainer';
import Layout from 'process/NB/ManualUnderwriting/Layout';
import PolicyNo from 'process/NB/ManualUnderwriting/PolicyNo';
import Client from 'process/NB/ManualUnderwriting/Client';
import OverallRisk from './OverallRisk';
import ApprovalDecision from './ApprovalDecision';
import FECDetail from './Detail';
import useLoadRegionalDefaultValueList from 'process/NB/ManualUnderwriting/_hooks/useLoadRegionalDefaultValueList';

import { ManualUnderwritingConfig } from './page.config';
import { useSetBizData } from './_hooks';

const FECApproval = ({ taskDetail, businessData }: any) => {
  useSetBizData({
    businessData,
  });

  useLoadFieldsCustomerTypeConfig({
    atomGroupCode: 'BP_NB_CTG001_BP_NB_ACT004',
  });
  useLoadFieldsDisabledConfig();
  useLoadRegionalDefaultValueList();

  return (
    <>
      <PageContainer pageConfig={ManualUnderwritingConfig}>
        <Layout>
          <PolicyNo />
          <Client mode="show" />
        </Layout>
      </PageContainer>
      <PageContainer
        pageConfig={{
          caseCategory: taskDetail.caseCategory,
          activityCode: taskDetail.taskDefKey,
        }}
      >
        <SectionLayout
          config={[
            { name: 'OverallRisk', wrapperCol: 8 },
            { name: 'ApprovalDecision', wrapperCol: 16 },
            { name: 'FECDetail', wrapperCol: 24 },
          ]}
        >
          <OverallRisk />
          <ApprovalDecision />
          <FECDetail />
        </SectionLayout>
      </PageContainer>
    </>
  );
};

export default connect()(setClaimEditableHoc(setInsured360Hoc(FECApproval)));
