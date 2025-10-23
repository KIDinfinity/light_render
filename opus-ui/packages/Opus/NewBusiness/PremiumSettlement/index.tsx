import React, { useEffect } from 'react';
import { useDispatch, connect } from 'dva';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import useSetTaskDetail from 'opus/NewBusiness/PremiumSettlement/_hooks/useSetTaskDetail';
import useSetBizData from 'opus/NewBusiness/PremiumSettlement/_hooks/useSetBizData';
import useGetRejected from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetRejected';
import TaskStatus from 'opus/NewBusiness/PremiumSettlement/Enum/taskStatus';
import Premium from './Premium';
import WarningMessage from './WarningMessage';
import PageContainer from 'basic/components/Elements/PageContainer';
import pageConfig from './page.config';
import CalcProcess from './CalcProcess';
import useHandleChequeUpdate from 'process/NB/Share/hooks/useHandleChequeUpdate';
import useInitChequeInfoListFromBizData from 'process/NB/Share/hooks/useInitChequeInfoListFromBizData';
import useGetPayTypeCheuqeDisplay from 'process/NB/Share/hooks/useGetPayTypeCheuqeDisplay';
import useClearChequeInfoBeforeLeave from 'process/NB/Share/hooks/useClearChequeInfoBeforeLeave';
import DataPriority from 'enum/DataPriority';
import useHandleChangeDataPiorityCallback from 'basic/components/DataPriorityContainer/hooks/useHandleChangeDataPiorityCallback';
import useLoadRegionalDefaultValueList from 'opus/NewBusiness/PremiumSettlement/_hooks/useLoadRegionalDefaultValueList';
import Block from 'basic/components/Block';
import MouseTrackContainer from 'basic/components/MouseTrackContainer';
import useJudgeNTUWarningDisplayForPremiumSettlement from 'opus/NewBusiness/PremiumSettlement/_hooks/useJudgeNTUWarningDisplayForPremiumSettlement';
import styles from './index.less';
import InformationModal from '../ManualUnderwriting/_components/InformationModal';
import PremiumTransferModal from '../ManualUnderwriting/_components/PremiumTransferModal';
import { useInitBusinessData } from '../ManualUnderwriting/_hooks';
import { NAMESPACE } from './activity.config';

const PremiumSettlement = ({ taskDetail, businessData }: any) => {
  // 初始化和manual underwriting共用的数据（用于Payment Transfer弹窗）
  useInitBusinessData({ businessData, taskDetail, source: 'premiumSettlement' });
  useInitChequeInfoListFromBizData({ businessData });
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
  useEffect(() => {
    console.log('getRegionalDefaultValuexx');
    dispatch({
      type: `${NAMESPACE}/getRegionalDefaultValue`,
      payload: {
        codeType: 'WarningCreditCardRefund',
      },
    });
  }, []);
  return (
    <PageContainer pageConfig={pageConfig}>
      <MouseTrackContainer display={displayNtuWarning}>
        <InformationModal />
        <PremiumTransferModal />
        <div className={styles.container}>
          <WarningMessage />
          <div className={styles.content}>
            <CalcProcess />
            <Premium />
          </div>
        </div>
        <Block display={displayNtuWarning} />
      </MouseTrackContainer>
    </PageContainer>
  );
};

export default connect()(setClaimEditableHoc(setInsured360Hoc(PremiumSettlement)));
