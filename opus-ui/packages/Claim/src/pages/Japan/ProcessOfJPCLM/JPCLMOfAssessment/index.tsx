/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, notification } from 'antd';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import SectionTitle from 'claim/components/SectionTitle';
import CaseSplit, { ESplitTypes } from 'claim/pages/CaseSplit';
import MedicalSearchModal from 'claim/components/MedicalSearchModal';
import TaskStatus from 'claim/enum/TaskStatus';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import handleMessageModal from '@/utils/commonMessage';
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import DecisionModal from './DecisionModal';
import { denormalizeClaimData } from './_models/functions/normalizeFunc';
import InsuredInfo from './Insured/InsuredInfo';
import ClaimantInfo from './ClaimantInfo/ClaimantInfo';
import DocTypeInfo from './DocTypeInfo';
import AssessmentResult from './ClaimResult/AssessmentResult';
import AssessmentHandle from './ClaimResult/AssessmentHandle';
import IncidentList from './Incident/IncidentList';
import { updateSplitDataByIncident, updateSplitDataByPolicy } from './_models/functions';
import { JPCLMCTG01_TASKDEFKEY } from './Enum';
import { userProIdGetDataTaskdefKey } from './taskDefKey';

import { row12 } from './FormLayout.json';

// @ts-ignore
@connect(
  ({
    JPCLMOfClaimAssessmentController,
    user,
    formCommonController,
    dictionaryController,
    loading,
    claimEditable,
  }: any) => ({
    claimProcessData: JPCLMOfClaimAssessmentController.claimProcessData,
    claimEntities: JPCLMOfClaimAssessmentController.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    dictsClaimType: dictionaryController.ClaimType,
    listPolicy: JPCLMOfClaimAssessmentController.listPolicy,
    loadingReAssessment: loading.effects['JPCLMOfClaimAssessmentController/reAssessment'],
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class JPCLMOfManualAssessment extends Component<any> {
  state = {
    benefitOpen: false,
    startAction: false,
  };

  static childContextTypes = {
    isValidateWarning: PropTypes.bool,
  };

  getChildContext() {
    return {
      isValidateWarning: [TaskStatus.Pending, TaskStatus.Todo].includes(
        this?.props?.taskDetail?.taskStatus
      ),
    };
  }

  componentDidMount = () => {
    this.handleInitPage();
  };

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (nextState.startAction) {
      return false;
    }
    const {
      claimProcessData,
      claimEntities,
      userId,
      submited,
      benefitOpen: nextBenefitOpen,
      taskDetail,
    }: any = this.props;
    const { benefitOpen } = this.state;
    const {
      claimProcessData: nextClaimProcessData,
      claimEntities: nextClaimEntities,
      userId: nextUserId,
      submited: nextSubmited,
      taskDetail: nextTaskDetail,
    } = nextProps;
    let shouldUpdate = false;

    if (
      !lodash.isEqual(claimProcessData, nextClaimProcessData) ||
      !lodash.isEqual(userId, nextUserId) ||
      !lodash.isEqual(submited, nextSubmited) ||
      !lodash.isEqual(benefitOpen, nextBenefitOpen) ||
      !lodash.isEqual(claimEntities, nextClaimEntities) ||
      !lodash.isEqual(taskDetail, nextTaskDetail)
    ) {
      shouldUpdate = true;
    }
    return shouldUpdate;
  }

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/clearClaimProcessData',
    });
    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });

    // 初始化payment allocation
    dispatch({
      type: 'paymentAllocation/resetAllocation',
    });
  };

  get handleSubmitData() {
    const { claimProcessData, claimEntities, taskDetail }: any = this.props;
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    return {
      ...content,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
      activityKey: taskDetail.taskDefKey,
    };
  }

  handleInitPage = async () => {
    const { dispatch, taskDetail = {}, businessData }: any = this.props;
    const {
      inquiryBusinessNo,
      businessNo,
      caseCategory,
      processInstanceId,
      taskDefKey,
      taskStatus,
      assignee,
    } = taskDetail;
    // 医的确认节点，打开情报管理
    if (taskDefKey === 'JP_MC_ACT001') {
      dispatch({
        type: 'workspaceSwitchOn/changeSwitch',
        payload: {
          name: 'remark',
        },
      });
    }

    const onOkFn =
      taskDefKey === JPCLMCTG01_TASKDEFKEY.ManualAssessment
        ? this.reassessByAssignDocument
        : () => { };
    if (taskStatus !== TaskStatus.Completed) {
      await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getPreApprovalValue',
        payload: {
          inquiryBusinessNo,
        },
      });
    }

    await dispatch({
      type: 'JPCLMOfClaimAssessmentController/initBusinessData',
      payload: {
        processInstanceId,
        caseCategory,
        businessNo,
        taskStatus,
        onOkFn,
        assignee,
        businessData,
      },
    });
    if (lodash.includes(userProIdGetDataTaskdefKey, taskDefKey)) {
      dispatch({
        type: 'insured360/saveInsuredIdCondition',
        payload: {
          claimNo: lodash.get(businessData, 'claimNo'),
        },
      });
    }

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/getPolicyInsuredBeneficiaryOwner',
      payload: {
        claimNo: businessNo,
      },
    });
    this.getDropdown();
    this.openAllocationDataChannel();
  };

  reassessByAssignDocument = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessmentController/reAssessment',
      payload: {
        submit: this.handleSubmitData,
        byAssignDocument: true,
      },
    });
  };

  getDropdown = () => {
    const { dispatch, taskDetail }: any = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo: taskDetail.businessNo,
      },
    });

    // select start
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.JPAssessment,
    });
  };

  handleReAssessment = async () => {
    const { dispatch }: any = this.props;

    const response = await dispatch({
      type: 'JPCLMOfClaimAssessmentController/reAssessment',
      payload: {
        submit: this.handleSubmitData,
        byAssignDocument: false,
      },
    });

    if (response && response.success) {
      notification.success({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'claim.message.reAssessment.success',
        }),
      });
    } else {
      handleMessageModal(response ? response.promptMessages : '');
    }
  };

  updateClaimProcessData = async (claimProcessData: any, fnShowLoading: Function) => {
    const { dispatch }: any = this.props;
    // 重新理算
    const result = await dispatch({
      type: 'JPCLMOfClaimAssessmentController/reAssessment',
      payload: {
        submit: claimProcessData,
      },
    });
    if (!lodash.get(result, 'success')) {
      notification.error({
        message: formatMessageApi({ Label_COM_WarningMessage: 'venus.claim.re-assessment-failed' }),
      });
    }
    if (lodash.isFunction(fnShowLoading)) fnShowLoading(false);
  };

  updatePostData = (postData: any, splitType: string) => {
    const { listPolicy } = this.props;
    switch (splitType) {
      case ESplitTypes.Incident:
        return updateSplitDataByIncident(postData);
      case ESplitTypes.Document:
        return postData;
      case ESplitTypes.Policy:
      default:
        return updateSplitDataByPolicy(postData, listPolicy);
    }
  };

  handleBenefitOpen = () => {
    this.setState({
      benefitOpen: true,
    });
  };

  handleBenefitClose = () => {
    this.setState({
      benefitOpen: false,
    });
  };

  openAllocationDataChannel = () => {
    const { dispatch } = this.props;
    const claimData: any = dispatch({
      type: 'JPCLMOfClaimAssessmentController/getDenormalizedData',
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
      type: 'JPCLMOfClaimAssessmentController/getDenormalizedData',
    });

    result?.then?.((claimData: any) => {
      dispatch({
        type: 'paymentAllocation/allocationOpen',
        payload: { claimData },
      });

      this.handleBenefitOpen();
    });
  };

  handleAllocationClose = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'paymentAllocation/toggleModal',
      payload: { opened: false },
    });
    this.handleBenefitClose();

    const backData: any = dispatch({
      type: 'paymentAllocation/getClaimData',
    });

    backData?.then?.((claimData: any) => {
      if (!lodash.isEmpty(claimData)) {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/savePaymentAllocation',
          payload: claimData,
        });
      }
    });
  };

  render() {
    const { benefitOpen } = this.state;

    const { dictsClaimType, listPolicy, taskDetail, taskNotEditable }: any = this.props;

    return (
      <div>
        <Row gutter={24}>
          <Col {...row12.layout}>
            <InsuredInfo />
          </Col>
          <Col {...row12.layout}>
            <ClaimantInfo />
            <DocTypeInfo />
          </Col>
        </Row>
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
        <AssessmentResult taskDetail={taskDetail} />
        <AssessmentHandle
          handleBenefitOpen={this.handleAllocationOpen}
          open={benefitOpen}
          handleReAssessment={this.handleReAssessment}
          disabled={taskNotEditable}
        />
        <IncidentList />
        {/**
        //@ts-ignore */}
        <CaseSplit
          // updatePaymentAmount={this.updatePaymentAmount}
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
        <DecisionModal />
        <MedicalSearchModal />
      </div>
    );
  }
}

export default JPCLMOfManualAssessment;
