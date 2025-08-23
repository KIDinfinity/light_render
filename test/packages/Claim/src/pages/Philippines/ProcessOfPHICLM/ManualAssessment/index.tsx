import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Row, Col, notification } from 'antd';
import type { Dispatch } from 'redux';

import { denormalizeClaimData, createNormalizeData } from '@/utils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionTitle from 'claim/components/SectionTitle';
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
import dictionaryConfig from './DictionaryByTypeCodes.config';
import DecisionModal from './DecisionModal';
import InsuredInfo from './Insured/InsuredInfo';
import ClaimantInfo from './Claimant/ClaimantInfo';
import AssessmentResult from './ClaimResult/AssessmentResult';
import AssessmentHandle from './ClaimResult/AssessmentHandle';
import IncidentList from './Incident/IncidentList';
import { wholeEntities } from './_models/dto/EntriesModel';
import { updateSplitDataByIncident, updateSplitDataByPolicy } from './_models/functions';

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
  dictsClaimType: IDictionary[];
  saveSnapshot: Function;
  listPolicy: IPolicy[];
}

@connect(
  ({
    PHCLMOfClaimAssessmentController,
    user,
    formCommonController,
    dictionaryController,
  }: any) => ({
    claimProcessData: PHCLMOfClaimAssessmentController.claimProcessData,
    claimEntities: PHCLMOfClaimAssessmentController.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    dictsClaimType: dictionaryController.Dropdown_CLM_PHClaimType,
    listPolicy: PHCLMOfClaimAssessmentController.listPolicy,
  })
)
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class BPOfManualAssessment extends Component<IProps> {
  state = {
    beneficiaryModeOpen: false,
  };

  componentDidMount = async () => {
    await this.getClaimData();
    await this.getDropdown();

    this.openAllocationDataChannel();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/clearClaimProcessData',
    });

    dispatch({
      type: 'formCommonController/clearForm',
    });

    // 初始化payment allocation
    dispatch({
      type: 'paymentAllocation/resetAllocation',
    });

    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };

  getClaimData = async () => {
    const { dispatch, businessData = {} }: any = this.props;

    await dispatch({
      type: 'PHCLMOfClaimAssessmentController/saveClaimProcessData',
      payload: businessData,
    });
  };

  getDropdown = () => {
    const { dispatch, taskDetail }: any = this.props;

    dispatch({
      type: 'PHCLMOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo: taskDetail.businessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.PHAssessment,
    });

    dispatch({
      type: 'dictionaryController/nationalityDropdown',
    });
    dispatch({
      type: 'dictionaryController/bankDropdown',
    });
    dispatch({
      type: 'dictionaryController/occupationDropdown',
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

  handleReAssessment = async () => {
    const { dispatch, claimProcessData, claimEntities, taskDetail } = this.props;

    dispatch({
      type: 'commonClaimAssessmentController/reAssessment',
      payload: {
        nameSpace: 'PHCLMOfClaimAssessmentController',
      },
    });
  };

  updatePaymentAmount = async (claimData: any) => {
    const { dispatch }: any = this.props;
    const result = await dispatch({
      type: 'PHCLMOfClaimAssessmentController/updatePayableAmount',
      payload: createNormalizeData(claimData, wholeEntities),
    });
    const { claimProcessData, claimEntities } = result;
    return denormalizeClaimData(claimProcessData, claimEntities);
  };

  updateClaimProcessData = async (claimProcessData: any, fnShowLoading: Function) => {
    const { dispatch }: any = this.props;
    // 更新前端页面数据
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/saveClaimProcessData',
      payload: claimProcessData,
    });
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
      type: 'PHCLMOfClaimAssessmentController/getDenormalizedData',
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
      type: 'PHCLMOfClaimAssessmentController/getDenormalizedData',
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
          type: 'PHCLMOfClaimAssessmentController/savePaymentAllocation',
          payload: claimData,
        });
      }
    });
    this.handleBeneficiaryClose();
  };

  render() {
    const { beneficiaryModeOpen } = this.state;
    const { dictsClaimType, listPolicy, taskDetail } = this.props;

    return (
      <>
        <Row gutter={24}>
          <Col {...layout}>
            <InsuredInfo />
          </Col>
          <Col {...layout}>
            <ClaimantInfo />
          </Col>
        </Row>
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
        <AssessmentResult />
        <AssessmentHandle
          handleBeneficiaryOpen={this.handleAllocationOpen}
          open={beneficiaryModeOpen}
          handleReAssessment={this.handleReAssessment}
        />
        <IncidentList />
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
        <DecisionModal />
        <OutPatientModal />
        <InpatientPerDayModal />
      </>
    );
  }
}

export default BPOfManualAssessment;
