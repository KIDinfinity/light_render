import React, { useEffect } from 'react';
import { useDispatch } from 'dva';

import PageContainer from 'basic/components/Elements/PageContainer';
import SectionLayout from 'opus/Components/SectionComponents/SectionLayout';
import setClaimEditableHocHook from 'claim/components/Hoc/setClaimEditableHocHook';

import AgentInfo from './Sections/AgentInfo';
import PolicyNo from './Sections/PolicyNo';
import Upload from './Sections/Upload';
import { NAMESPACE } from './activity.config';
import InsuredInfo from './Sections/InsuredInfo';
import ProductInfo from './Sections/ProductInfo';
import HealthQuestion from './Sections/HealthQuestion';
import FATCA from './Sections/FATCA';
import Crs from './Sections/Crs';
import DeliveryMethod from './Sections/DeliveryMethod';
import PayorInfo from './Sections/PayorInfo';
import BeneficiaryInfo from './Sections/BeneficiaryInfo';
import DividendIcp from './Sections/DividendIcp';
import TaxConsent from './Sections/TaxConsent';
import PDPA from './Sections/PDPA';
import MemoChecklist from './Sections/MemoChecklist';
import HealthQuestionPA from './Sections/HealthQuestionPA';
import VisibleContainer from './_context/VisibleContainer';

type Props = {
  taskDetail: any;
  businessData: any;
};

export default setClaimEditableHocHook(({ taskDetail, businessData }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/initConfig`,
      payload: { caseCategory: taskDetail?.caseCategory, activityCode: taskDetail?.taskDefKey },
    });
    dispatch({
      type: `${NAMESPACE}/getCountryList`,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getCityList`,
      payload: {
        values: [
          businessData?.insuredCrs?.countryOfTaxResidency,
          businessData?.payorCrs?.countryOfTaxResidency,
        ],
      },
    });
  }, [
    businessData?.insuredCrs?.countryOfTaxResidency,
    businessData?.payorCrs?.countryOfTaxResidency,
  ]);
  return (
    <PageContainer
      pageConfig={{ caseCategory: taskDetail?.caseCategory, activityKey: taskDetail?.activityKey }}
    >
      <VisibleContainer>
        <SectionLayout>
          <AgentInfo sectionId="agentInfo" />
          <PolicyNo sectionId="policyNoInfo" />
          <Upload sectionId="uploadDocuments" />
          <DeliveryMethod sectionId="deliveryMethod" />
          <BeneficiaryInfo sectionId="beneficiaryInfo" />
          <DividendIcp sectionId="dividendICP" />
          <PayorInfo sectionId="payorInfo" />
          <TaxConsent sectionId="taxConsent" />
          <PDPA sectionId="insuredPDPA" />
          <MemoChecklist sectionId="memoChecklist" />
          <InsuredInfo sectionId="insuredInfo" />
          <ProductInfo sectionId="productInfo" />
          <HealthQuestion sectionId="healthQuestion" />
          <FATCA sectionId="fATCA" />
          <Crs sectionId="crs" />
          <HealthQuestionPA sectionId="healthQuestionPA" />
        </SectionLayout>
      </VisibleContainer>
    </PageContainer>
  );
});
