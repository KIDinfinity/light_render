import React, { useEffect } from 'react';
import { NAMESPACE } from './activity.config';
import PageContainer from 'basic/components/Elements/PageContainer';

import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { notification, Row, Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { createNormalizeData, denormalizeClaimData } from '@/utils/claimUtils';
import CaseSplit, { ESplitTypes } from 'claim/pages/CaseSplit';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';

import setClaimEditableHocHook from 'claim/components/Hoc/setClaimEditableHocHook';

import { calculatPayableAmount } from './_models/functions/calculatPayableAmount';
import { wholeEntities } from './_models/dto/EntriesModel';

import Insured from './Modules/Insured';
import Claimant from './Modules/Claimant';
import SerialClaim from './Modules/SerialClaim';
import ServiceAgent from './Modules/ServiceAgent/ServiceAgent';
import IncidentList from './Modules/Incident/List';
import AssessmentResult from './Modules/ClaimResult/AssessmentResult';
import PaymentAllocation from './Modules/PaymentAllocation';
import NameScreeningModal from './Modules/NameScreening/modal';
import PopUpPayable from './Modules/PopUpPayable';
import SearchList from '../Components/Procedure/AntiCancerAndHormone/SearchList';
import PopUp from './Modules/PopUp';
import ProcedureModal from 'packages/Opus/Pages/Process/Claim/ManualAssessment/Modules/Therapies/Modal/index.tsx';
import OtherProcedureModal from 'packages/Opus/Pages/Process/Claim/ManualAssessment/Modules/OtherProcedure/Modal/index.tsx';
import { updateSplitDataByIncident, updateSplitDataByPolicy } from './_models/functions';
import FurtherClaimModal from 'claim/pages/HongKong/FurtherClaim';
import InformationModal from 'packages/Opus/NewBusiness/ManualUnderwriting/_components/InformationModal/index';

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

const ClaimAssessment = ({ taskDetail, businessData }: any) => {
  const dispatch = useDispatch();
  const dictsClaimType = getDrowDownList('ClaimType');
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy,
    shallowEqual
  );
  const editable = useSelector((state: any) => !state.claimEditable.taskNotEditable);

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
    dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: newBusinessData,
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

  useEffect(() => {
    initProcess();
  }, []);

  useEffect(() => {
    if (editable) {
      getClientInfoList();
    }
  }, [editable]);

  const handleAutoReAssessment = async () => {
    const nameSpace = NAMESPACE;
    const expectDecisionList = await dispatch({
      type: 'commonClaimAssessmentController/getExpectDecisionList',
      payload: {
        nameSpace,
      },
    });
    await dispatch({
      type: 'commonClaimAssessmentController/reAssessment',
      payload: {
        nameSpace,
        isNeedReAssessmentLog: false,
        ...expectDecisionList,
      },
    });
  };

  const updatePaymentAmount = async (claimData: any) => {
    const { claimProcessData, claimEntities }: any = createNormalizeData(claimData, wholeEntities);
    const result: any = calculatPayableAmount(claimProcessData, claimEntities);
    return denormalizeClaimData(result?.claimProcessData, result?.claimEntities);
  };

  const updateClaimProcessData = async (
    claimProcessData: any,
    fnShowLoading: Function,
    splitType: string
  ) => {
    // 更新前端页面数据
    dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: claimProcessData,
    });

    // 保存理赔比较数据
    dispatch({
      type: `${NAMESPACE}/initCompareClaimData`,
    });

    if (splitType === ESplitTypes.Incident) {
      handleAutoReAssessment();
    } else {
      // 更新snapshot数据
      const result = await dispatch({
        type: 'claimCaseController/saveSnapshot',
        payload: {
          postData: claimProcessData,
        },
      });

      if (!lodash.get(result, 'success')) {
        notification.error({
          message: 'Re-Assessment failed!',
        });
      }
    }

    if (lodash.isFunction(fnShowLoading)) fnShowLoading(false);
  };

  const updatePostData = (postData: any, splitType: string) => {
    switch (splitType) {
      case ESplitTypes.Incident:
        return updateSplitDataByIncident(postData);
      case ESplitTypes.Policy:
      default:
        return updateSplitDataByPolicy(postData);
    }
  };

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
      <AssessmentResult />
      <IncidentList />
      <CaseSplit
        updatePaymentAmount={updatePaymentAmount}
        updateClaimProcessData={updateClaimProcessData}
        updatePostData={updatePostData}
        claimTypes={dictsClaimType}
        listPolicy={listPolicy}
        taskDetail={taskDetail}
        tabConfig={{
          splitTypeDef: 'Incident',
          document: { disabled: true },
        }}
      />
      <PaymentAllocation />
      <HospitalIncomeModal title="modal" />
      <OutPatientModal />
      <InpatientPerDayModal />
      <FurtherClaimModal namespace={NAMESPACE} />
      <SerialClaim />
      <PopUpPayable />
      <NameScreening />
      <InformationModal />
      <SearchList NAMESPACE={NAMESPACE} />
      <PopUp />
      <ProcedureModal />
      <OtherProcedureModal />
    </PageContainer>
  );
};

export default setClaimEditableHocHook(ClaimAssessment);
