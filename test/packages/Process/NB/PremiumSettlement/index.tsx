import React, { useEffect } from 'react';
import { useDispatch, connect } from 'dva';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import useSetTaskDetail from 'process/NB/PremiumSettlement/_hooks/useSetTaskDetail';
import useSetBizData from 'process/NB/PremiumSettlement/_hooks/useSetBizData';
import useGetRejected from 'process/NB/PremiumSettlement/_hooks/useGetRejected';
import TaskStatus from 'process/NB/PremiumSettlement/Enum/taskStatus';
import Premium from './Premium';
import WarningMessage from './WarningMessage';
import PageContainer from 'basic/components/Elements/PageContainer';
import pageConfig from './page.config';
import CalcProcess from './CalcProcess';
import Layout from './Layout';
import Cheque from 'process/NB/Share/Components/Cheque';
import useHandleRefreshCallback from 'process/NB/PremiumSettlement/_hooks/useHandleRefreshCallback';
import useHandleChequeUpdate from 'process/NB/Share/hooks/useHandleChequeUpdate';
import useGetPayTypeCheuqeDisplay from 'process/NB/Share/hooks/useGetPayTypeCheuqeDisplay';
import useClearChequeInfoBeforeLeave from 'process/NB/Share/hooks/useClearChequeInfoBeforeLeave';
import DataPriority from 'enum/DataPriority';
import useHandleChangeDataPiorityCallback from 'basic/components/DataPriorityContainer/hooks/useHandleChangeDataPiorityCallback';
import useLoadRegionalDefaultValueList from 'process/NB/PremiumSettlement/_hooks/useLoadRegionalDefaultValueList';
import Block from 'basic/components/Block';
import MouseTrackContainer from 'basic/components/MouseTrackContainer';
import useJudgeNTUWarningDisplayForPremiumSettlement from 'process/NB/PremiumSettlement/_hooks/useJudgeNTUWarningDisplayForPremiumSettlement';

const PremiumSettlement = ({ taskDetail, businessData }: any) => {
  const { taskStatus } = taskDetail;
  const dispatch = useDispatch();
  const rejected = useGetRejected();
  useHandleChequeUpdate({
    businessData,
  });
  useSetTaskDetail({
    taskDetail,
  });
  useSetBizData({
    businessData,
  });

  const isShow = useGetPayTypeCheuqeDisplay();

  useEffect(() => {
    if (rejected && taskStatus !== TaskStatus.Completed) {
      dispatch({
        type: 'workspaceCases/handleOpenInfomation',
      });
    }
  }, [rejected, taskStatus]);
  const handleChangePriority = useHandleChangeDataPiorityCallback();
  useEffect(() => {
    window.requestIdleCallback(() => {
      handleChangePriority(DataPriority.MEDIUM);
    });
  }, [handleChangePriority]);
  useClearChequeInfoBeforeLeave();
  useLoadRegionalDefaultValueList();
  const displayNtuWarning = useJudgeNTUWarningDisplayForPremiumSettlement({ taskDetail });
  return (
    <PageContainer pageConfig={pageConfig}>
      <MouseTrackContainer display={displayNtuWarning}>
        <Layout>
          {isShow ? <Cheque useHandleRefreshCallback={useHandleRefreshCallback} /> : null}
          <WarningMessage />
          <Premium />
          <CalcProcess />
        </Layout>
        <Block display={displayNtuWarning} />
      </MouseTrackContainer>
    </PageContainer>
  );
};

export default connect()(setClaimEditableHoc(setInsured360Hoc(PremiumSettlement)));
