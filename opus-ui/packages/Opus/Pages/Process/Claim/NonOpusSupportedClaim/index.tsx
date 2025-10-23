import React, { useEffect, useState } from 'react';
import { NAMESPACE } from './activity.config';
import PageContainer from 'basic/components/Elements/PageContainer';

import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Row, Col } from 'antd';
import setClaimEditableHocHook from 'claim/components/Hoc/setClaimEditableHocHook';
import InformationModal from 'packages/Opus/NewBusiness/ManualUnderwriting/_components/InformationModal/index';

import Insured from './Modules/Insured';
import Claimant from './Modules/Claimant';
import ServiceAgent from './Modules/ServiceAgent/ServiceAgent';
import ClaimResult from './Modules/ClaimResult';
import FollowUpTaskList from './Modules/FollowUpTasks';
import ConfirmModal from './_components/ConfirmModal';
import NameScreeningModal from './Modules/NameScreening/modal';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

const NameScreening = () => {
  const open = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.nameScreeningVisible,
    shallowEqual
  );
  const dispatch = useDispatch();
  const onOpen = (visible: boolean) => {
    dispatch({
      type: `${NAMESPACE}/setNameScreeningVisible`,
      payload: {
        nameScreeningVisible: visible,
      },
    });
  };
  return <NameScreeningModal open={open} setOpen={onOpen} />;
};

const NonOpusSupportedClaim = ({ taskDetail, businessData }: any) => {
  const dispatch = useDispatch();
  const editable = useSelector((state: any) => !state.claimEditable.taskNotEditable);
  const forceUpdateFlag = useSelector(({ task }: any) => task?.forceUpdateFlag);
  const [manualUpdateFlag, setManualUpdateFlag] = useState(false);

  const getClaimData = async () => {
    const newBusinessData = {
      ...businessData,
      processInstanceId: taskDetail?.processInstanceId,
      taskId: taskDetail?.taskId,
    };

    // 保存理赔比较数据
    dispatch({
      type: `${NAMESPACE}/initCompareClaimData`,
      payload: { taskId: taskDetail?.taskId },
    });
    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: newBusinessData,
    });

    dispatch({
      type: `${NAMESPACE}/getPolicyOwnerList`,
    });

    dispatch({
      type: `${NAMESPACE}/saveTaskDetail`,
      payload: { taskDetail },
    });
    dispatch({
      type: 'auditLogController/saveCurrentController',
      payload: {
        currentController: NAMESPACE,
      },
    });
  };

  const getClientInfoList = () => {
    dispatch({
      type: `${NAMESPACE}/fetchClientInfoList`,
    });
  };

  const getDropdown = () => {
    dispatch({
      type: `${NAMESPACE}/queryListPolicy`,
      payload: {
        claimNo: taskDetail?.businessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/bankDropdown',
    });
    dispatch({
      type: 'dictionaryController/occupationDropdown',
    });

    dispatch({
      type: `${NAMESPACE}/checkRegisterMcs`,
      payload: {
        claimNo: taskDetail?.businessNo,
      },
    });
    dispatch({
      type: `${NAMESPACE}/getAgentNoList`,
      payload: {
        claimNo: taskDetail?.businessNo || taskDetail?.inquiryBusinessNo,
      },
    });
  };

  const getExchangeRateForInvoiceCurrencyPayout = async () => {
    await dispatch({
      type: `${NAMESPACE}/getExchangeRateForInvoiceCurrencyPayout`,
    });
  };
  const decisionMapping = () => {
    dispatch({
      type: `${NAMESPACE}/decisionMapping`,
    });
  };
  const initProcess = async () => {
    await getClaimData();
    await getDropdown();
    await getExchangeRateForInvoiceCurrencyPayout();
    await decisionMapping();
  };

  const forceUpdateSnapshot = async () => {
    setManualUpdateFlag(false);
    await getClaimData();

    dispatch({
      type: `${NAMESPACE}/saveSnapshot`,
    });

    dispatch({
      type: 'task/updataTask',
      payload: {
        forceUpdateFlag: undefined,
      },
    });
  };

  useEffect(() => {
    initProcess();
  }, []);

  useEffect(() => {
    if (editable) {
      getClientInfoList();
    }
  }, [editable]);

  useEffect(() => {
    if (forceUpdateFlag === 'Y') {
      setTimeout(() => {
        setManualUpdateFlag(true);
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceUpdateFlag]);

  useEffect(() => {
    if (manualUpdateFlag) {
      forceUpdateSnapshot();
    }
  }, [manualUpdateFlag]);

  return (
    <PageContainer pageConfig={taskDetail}>
      <Row gutter={24}>
        <Col {...layout}>
          <Insured />
        </Col>
        <Col {...layout}>
          <Claimant />
        </Col>
      </Row>
      <Row>
        <Col>
          <ServiceAgent />
        </Col>
      </Row>
      <Row>
        <Col>
          <ClaimResult />
        </Col>
      </Row>
      <Row>
        <Col>
          <FollowUpTaskList />
        </Col>
      </Row>
      <NameScreening />
      <InformationModal />
      <ConfirmModal />
    </PageContainer>
  );
};

export default setClaimEditableHocHook(NonOpusSupportedClaim);
