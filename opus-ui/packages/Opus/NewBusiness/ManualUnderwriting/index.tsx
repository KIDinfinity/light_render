import React, { useEffect } from 'react';
import { useDispatch, connect } from 'dva';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import PageContainer from 'basic/components/Elements/PageContainer';
import MouseTrackContainer from 'basic/components/MouseTrackContainer';
import WarningMessage from './Pages/WarningMessage';
import Client from './Pages/Client';
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
import Decision from './Pages/Decision';
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
import InformationModal from './_components/InformationModal/index';
import PremiumTransferModal from './_components/PremiumTransferModal';
import useGetRetrieveExistCorpFromLA from './Pages/Client/_hooks/useGetRetrieveExistCorpFromLA';
import useGetDisplayUBOInfoFlag from './Pages/Client/_hooks/useGetDisplayUBOInfoFlag';

const ManualUnderwriting = ({ businessData, taskDetail, needUpdate }: any) => {
  const dispatch = useDispatch();
  useInitBusinessData({ businessData, taskDetail });
  useUpdateBusinessData({ businessData, taskDetail, needUpdate });
  useGetRetrieveExistCorpFromLA();
  useGetDisplayUBOInfoFlag();

  const displayNtuWarning = useJudgeNTUWarningDisplay({ taskDetail });
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getRegionalDefaultValue`,
      payload: {
        codeType: 'WarningCreditCardRefund',
      },
    });
  }, []);

  return (
    <PageContainer
      pageConfig={{ caseCategory: taskDetail?.caseCategory, activityKey: taskDetail?.activityKey }}
    >
      <MouseTrackContainer display={displayNtuWarning}>
        <WarningMessage />
        <InformationModal />
        <PremiumTransferModal />
        <Client />
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

export default connect()(setClaimEditableHoc(setInsured360Hoc(ManualUnderwriting)));
