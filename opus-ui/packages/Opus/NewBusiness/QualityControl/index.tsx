import React from 'react';
import { connect } from 'dva';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import PageContainer from 'basic/components/Elements/PageContainer';
import MouseTrackContainer from 'basic/components/MouseTrackContainer';
import WarningMessage from 'opus/NewBusiness/ManualUnderwriting/Pages/WarningMessage';
import Client from 'opus/NewBusiness/ManualUnderwriting/Pages/Client';
import Plan from 'opus/NewBusiness/ManualUnderwriting/Pages/Plan';
import Payment from 'opus/NewBusiness/ManualUnderwriting/Pages/Payment';
import CharityOrganization from 'opus/NewBusiness/ManualUnderwriting/Pages/CharityOrganization';
import Fund from 'opus/NewBusiness/ManualUnderwriting/Pages/Fund';
import Chart from 'opus/NewBusiness/ManualUnderwriting/Pages/Fund/Chart';
import PolicyReplacement from 'opus/NewBusiness/ManualUnderwriting/Pages/PolicyReplacement';
import useInitBusinessData from './_hooks/useInitBusinessData';
import DistributionChannel from 'opus/NewBusiness/ManualUnderwriting/Pages/DistributionChannel';
import TakeOver from 'opus/NewBusiness/ManualUnderwriting/Pages/TakeOver';
import Loan from 'opus/NewBusiness/ManualUnderwriting/Pages/Loan';
import Decision from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision';
import CustomerIdentification from 'opus/NewBusiness/ManualUnderwriting/Pages/CustomerIdentification';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import RuleResultsModel from 'opus/NewBusiness/ManualUnderwriting/Pages/RuleResultsModel';
import VoiceRecord from 'opus/NewBusiness/ManualUnderwriting/Pages/VoiceRecord';
import TwoColLayout from 'opus/NewBusiness/ManualUnderwriting/_components/TwoColLayout';
import Processing from 'opus/NewBusiness/ManualUnderwriting/_components/Processing';
import MedicalRequestModal from 'navigator/components/CaseTaskDetail/MedicalRequestModal';
import useUpdateBusinessData from 'opus/NewBusiness/ManualUnderwriting/_hooks/useUpdateBusinessData';
import useJudgeNTUWarningDisplay from 'basic/hooks/useJudgeNTUWarningDisplay';
import Block from 'basic/components/Block';
import InformationModal from 'opus/NewBusiness/ManualUnderwriting/_components/InformationModal/index';
import PremiumTransferModal from 'opus/NewBusiness/ManualUnderwriting/_components/PremiumTransferModal';
import EditMode from '../CustomerIdentification/_enum/EidtMode';
import useGetRetrieveExistCorpFromLA from '../ManualUnderwriting/Pages/Client/_hooks/useGetRetrieveExistCorpFromLA';
import useGetDisplayUBOInfoFlag from '../ManualUnderwriting/Pages/Client/_hooks/useGetDisplayUBOInfoFlag';

const QualityControl = ({ businessData, taskDetail, needUpdate }: any) => {
  useInitBusinessData({ businessData, taskDetail });
  useUpdateBusinessData({ businessData, taskDetail, needUpdate });
  useGetRetrieveExistCorpFromLA();
  useGetDisplayUBOInfoFlag();

  const displayNtuWarning = useJudgeNTUWarningDisplay({ taskDetail });

  return (
    <PageContainer
      pageConfig={{ caseCategory: taskDetail?.caseCategory, activityKey: taskDetail?.activityKey }}
    >
      <MouseTrackContainer display={displayNtuWarning}>
        <WarningMessage />
        <InformationModal />
        <PremiumTransferModal />
        <Client editMode={EditMode.Plain} />
        <Plan />
        <Payment />
        <Decision />
        <TwoColLayout>
          <CharityOrganization caseCategory={taskDetail?.caseCategory} />
          <Fund />
          <TakeOver />
          <Loan />
          <PolicyReplacement />
          <VoiceRecord />
        </TwoColLayout>
        <DistributionChannel />
        <Chart />
        <CustomerIdentification mainNAMESPACE={NAMESPACE} />
        <RuleResultsModel NAMESPACE={NAMESPACE} />
        <Processing />
        <Block display={displayNtuWarning} />
        <MedicalRequestModal />
      </MouseTrackContainer>
    </PageContainer>
  );
};

export default connect()(setClaimEditableHoc(setInsured360Hoc(QualityControl)));
