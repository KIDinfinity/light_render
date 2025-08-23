import React, { Component } from 'react';
import { NAMESPACE } from './activity.config';
import PageContainer from 'basic/components/Elements/PageContainer';

import { connect } from 'dva';
import lodash from 'lodash';
import { notification } from 'antd';
import type { Dispatch } from 'redux';
import { safeParseUtil } from '@/utils/utils';
import { createNormalizeData, denormalizeClaimData } from '@/utils/claimUtils';
import handleMessageModal from '@/utils/commonMessage';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import CaseSplit, { ESplitTypes } from 'claim/pages/CaseSplit';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';
import type { IDictionary } from '@/dtos/dicts';
import type { IPolicy } from '@/dtos/claim';

import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';

import PaymentAllocation from 'claim/pages/PaymentAllocation';
import { ElementConfig } from 'basic/components/Form';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import { calculatPayableAmount } from './_models/functions/calculatPayableAmount';
import Insured from './Insured/Insured';
import Claimant from './Claimant/Claimant';
import ServiceAgent from './ServiceAgent/ServiceAgent';
import AssessmentResult from './ClaimResult/AssessmentResult';
import AssessmentHandle from './ClaimResult/AssessmentHandle';
import IncidentList from './Incident/List';
import { wholeEntities } from './_models/dto/EntriesModel';
import SerialClaim from './SerialClaim';
import { updateSplitDataByIncident, updateSplitDataByPolicy } from './_models/functions';
import activityLocalConfig from './activity.config';
import { getReAssessmentWarn } from 'process/Utils';
import FurtherClaimModal from 'claim/pages/HongKong/FurtherClaim';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};
interface IProps {
  dispatch: Dispatch<any>;
  claimProcessData: any;
  claimEntities: any;
  userId: string;
  submited: boolean;
  taskDetail: any;
  buttonList: any;
  dictsClaimType: IDictionary[];
  saveSnapshot: Function;
  listPolicy: IPolicy[];
}

@connect(({ JPCLMOfClaimAssessment, user, formCommonController, dictionaryController }: any) => ({
  originClaimProcessData: JPCLMOfClaimAssessment.originClaimProcessData,
  claimProcessData: JPCLMOfClaimAssessment.claimProcessData,
  claimEntities: JPCLMOfClaimAssessment.claimEntities,
  userId: lodash.get(user, 'currentUser.userId'),
  submited: formCommonController.submited,
  dictsClaimType: dictionaryController.ClaimType,
  listPolicy: JPCLMOfClaimAssessment.listPolicy,
}))
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class HKOfManualAssessment extends Component<IProps> {
  state = {
    beneficiaryModeOpen: false,
  };

  componentDidMount = async () => {
    await this.getClaimData();
    await this.getDropdown();
    this.openAllocationDataChannel();
    await this.getExchangeRateForInvoiceCurrencyPayout();
    await this.decisionMapping();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessment/clearClaimProcessData',
    });

    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  decisionMapping = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessment/decisionMapping',
    });
  };

  getExchangeRateForInvoiceCurrencyPayout = async () => {
    const { dispatch }: any = this.props;
    await dispatch({
      type: 'JPCLMOfClaimAssessment/getExchangeRateForInvoiceCurrencyPayout',
    });
  };

  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;

    const newBusinessData = {
      ...businessData,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
    };

    // 保存理赔比较数据
    dispatch({
      type: 'JPCLMOfClaimAssessment/initCompareClaimData',
      payload: { taskId: taskDetail.taskId },
    });

    await dispatch({
      type: 'JPCLMOfClaimAssessment/saveClaimProcessData',
      payload: newBusinessData,
    });
    dispatch({
      type: 'JPCLMOfClaimAssessment/saveTaskDetail',
      payload: { taskDetail },
    });
  };

  getDropdown = () => {
    const { dispatch, taskDetail }: any = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessment/queryListPolicy',
      payload: {
        claimNo: taskDetail?.businessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.JPManualAssessment,
    });
    dispatch({
      type: 'dictionaryController/bankDropdown',
    });
    dispatch({
      type: 'dictionaryController/occupationDropdown',
    });

    dispatch({
      type: 'JPCLMOfClaimAssessment/checkRegisterMcs',
      payload: {
        claimNo: taskDetail?.businessNo,
      },
    });
    dispatch({
      type: 'JPCLMOfClaimAssessment/getAgentNoList',
      payload: {
        claimNo: taskDetail?.businessNo || taskDetail?.inquiryBusinessNo,
      },
    });
  };

  handleBeneficiaryOpen = () => {
    this.setState({
      beneficiaryModeOpen: true,
    });
  };

  handleBeneficiaryClose = () => {
    this.setState({
      beneficiaryModeOpen: false,
    });
  };

  handleReAssessment = () => {
    const { dispatch } = this.props;

    getReAssessmentWarn({ nameSpace: NAMESPACE, dispatch });
  };

  handleAutoReAssessment = async () => {
    const { dispatch } = this.props;
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
        ...expectDecisionList,
      },
    });
  };

  updatePaymentAmount = async (claimData: any) => {
    const { claimProcessData, claimEntities }: any = createNormalizeData(claimData, wholeEntities);
    const result: any = calculatPayableAmount(claimProcessData, claimEntities);
    return denormalizeClaimData(result?.claimProcessData, result?.claimEntities);
  };

  updateClaimProcessData = async (
    claimProcessData: any,
    fnShowLoading: Function,
    splitType: string
  ) => {
    const { dispatch }: any = this.props;
    // 更新前端页面数据
    dispatch({
      type: 'JPCLMOfClaimAssessment/saveClaimProcessData',
      payload: claimProcessData,
    });

    // 保存理赔比较数据
    dispatch({
      type: 'JPCLMOfClaimAssessment/initCompareClaimData',
    });

    if (splitType === ESplitTypes.Incident) {
      this.handleAutoReAssessment();
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

  updatePostData = (postData: any, splitType: string) => {
    switch (splitType) {
      case ESplitTypes.Incident:
        return updateSplitDataByIncident(postData);
      case ESplitTypes.Policy:
      default:
        return updateSplitDataByPolicy(postData);
    }
  };

  openAllocationDataChannel = () => {
    const { dispatch } = this.props;
    const claimData: any = dispatch({
      type: 'JPCLMOfClaimAssessment/getDenormalizedData',
    });

    return claimData?.then?.((claimData: any) => {
      dispatch({
        type: 'paymentAllocation/openDataChannel',
        payload: { claimData },
      });

      return claimData;
    });
  };

  handleAllocationOpen = () => {
    const { dispatch } = this.props;
    const result: any = dispatch({
      type: 'JPCLMOfClaimAssessment/getDenormalizedData',
    });

    result?.then?.((claimData: any) => {
      dispatch({
        type: 'paymentAllocation/allocationOpen',
        payload: { claimData },
      });
      this.handleBeneficiaryOpen();
    });
  };

  handleAllocationClose = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'paymentAllocation/toggleModal',
      payload: { opened: false },
    });

    const backData: any = dispatch({
      type: 'paymentAllocation/getClaimData',
    });

    backData?.then?.((claimData: any) => {
      if (!lodash.isEmpty(claimData)) {
        dispatch({
          type: 'JPCLMOfClaimAssessment/savePaymentAllocation',
          payload: claimData,
        });
      }
    });
    this.handleBeneficiaryClose();
  };

  handleClaimRgister = async () => {
    const { dispatch, taskDetail, buttonList } = this.props;
    const activityButtonList = lodash.first(buttonList)?.activityButtonServiceList;
    const { method = {}, activityVariables = {} } = lodash.pick(
      safeParseUtil(activityButtonList[1]?.buttonParams),
      ['method', 'activityVariables']
    );
    const dataForSubmit = await dispatch({
      type: 'JPCLMOfClaimAssessment/getDataForSubmit',
    });
    const submitData = getSubmitData({ taskDetail, dataForSubmit, variables: activityVariables });
    const inquiryClaimNo = lodash.get(submitData?.businessData, 'inquiryClaimNo');
    const response = await dispatch({
      type: 'JPCLMOfClaimAssessment/registerHkClaimCase',
      payload: {
        ...submitData,
        method,
        inquiryBusinessNo: inquiryClaimNo,
      },
    });
    if (!response?.success) {
      handleMessageModal(response?.promptMessages);
    }
  };

  render() {
    const { beneficiaryModeOpen } = this.state;
    const { dictsClaimType, listPolicy, taskDetail } = this.props;

    return (
      <>
        <PageContainer pageConfig={taskDetail}>
          <ElementConfig.ActivityLayout config={activityLocalConfig}>
            <Insured section="insured" />
            <Claimant section="claimant" />
            <ServiceAgent section="agent" />
            <AssessmentResult section="claimResult" />
            <AssessmentHandle
              handleBeneficiaryOpen={this.handleAllocationOpen}
              open={beneficiaryModeOpen}
              handleReAssessment={this.handleReAssessment}
              handleClaimRgister={this.handleClaimRgister}
              section="claimHandle"
            />
            <IncidentList section="Incident" />
          </ElementConfig.ActivityLayout>
          <CaseSplit
            updatePaymentAmount={this.updatePaymentAmount}
            updateClaimProcessData={this.updateClaimProcessData}
            updatePostData={this.updatePostData}
            claimTypes={dictsClaimType}
            listPolicy={listPolicy}
            taskDetail={taskDetail}
            tabConfig={{
              document: { disabled: true },
            }}
          />
          <PaymentAllocation onCancel={this.handleAllocationClose} />
          <HospitalIncomeModal title="modal" />
          <OutPatientModal />
          <InpatientPerDayModal />
          <FurtherClaimModal namespace={NAMESPACE} />
          <SerialClaim />
        </PageContainer>
      </>
    );
  }
}

export default HKOfManualAssessment;
