import React from 'react';
import { connect } from 'dva';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import PageContainer from 'basic/components/Elements/PageContainer';
import MouseTrackContainer from 'basic/components/MouseTrackContainer';
import ErrorMessage from './Pages/ErrorMessage';
import PolicyNo from './Pages/PolicyNo';
import Client from './Pages/Client';
import ReButton from './Pages/ReButton';
import Plan from './Pages/Plan';
import Payment from './Pages/Payment';
import CharityOrganization from './Pages/CharityOrganization';
import Fund from './Pages/Fund';
import Chart from './Pages/Fund/Chart';
import PolicyReplacement from './Pages/PolicyReplacement';
import useInitBusinessData from './_hooks/useInitBusinessData';
import DistributionChannel from './Pages/DistributionChannel';
import TakeOver from './Pages/TakeOver';
import Loan from './Pages/Loan';
import Decision from './Pages/Decision/Show';
import CustomerIdentification from './Pages/CustomerIdentification';
import { NAMESPACE } from './activity.config';
import RuleResultsModel from './Pages/RuleResultsModel';
import VoiceRecord from './Pages/VoiceRecord';
import TwoColLayout from './_components/TwoColLayout';
import Processing from './_components/Processing';
import MedicalRequestModal from 'navigator/components/CaseTaskDetail/MedicalRequestModal';
import useUpdateBusinessData from './_hooks/useUpdateBusinessData';
import useJudgeNTUWarningDisplay from 'basic/hooks/useJudgeNTUWarningDisplay';
import Block from 'basic/components/Block';
import useSetVoiceRecord from 'process/NewBusiness/ManualUnderwriting/_hooks/useSetVoiceRecord';

import EscalateModal from './_components/EscalateModal';

const ManualUnderwriting = ({ businessData, taskDetail, needUpdate }: any) => {
  useSetVoiceRecord({
    businessData,
  });
  useInitBusinessData({ businessData, taskDetail });
  useUpdateBusinessData({ businessData, taskDetail, needUpdate });
  const displayNtuWarning = useJudgeNTUWarningDisplay({ taskDetail });
  // TODO:这个hooks用于一次性处理feild的配置
  // usePageAtomConfig(taskDetail);
  return (
    <PageContainer
      pageConfig={{ caseCategory: taskDetail?.caseCategory, activityKey: taskDetail?.activityKey }}
    >
      <MouseTrackContainer display={displayNtuWarning}>
        <ErrorMessage />
        <EscalateModal />
        <PolicyNo />
        <Client />
        <Plan />
        <Payment />
        <ReButton />
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

export default connect()(setClaimEditableHoc(setInsured360Hoc(ManualUnderwriting)));
