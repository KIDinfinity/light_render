import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionTitle from 'claim/components/SectionTitle';
import MedicalSearchModal from 'claim/components/MedicalSearchModal';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import InsuredInfo from '../JPCLMOfAssessment/Insured/InsuredInfo';
import ClaimantInfo from '../JPCLMOfAssessment/ClaimantInfo/ClaimantInfo';
import DocTypeInfo from '../JPCLMOfAssessment/DocTypeInfo';
import AssessmentResult from './AssessmentResult';
import AssessmentHandle from './AssessmentHandle';
import IncidentList from '../JPCLMOfAssessment/Incident/IncidentList';
import { FormItemContext } from 'basic/components/Form';
import { row12 } from '../JPCLMOfAssessment/FormLayout.json';

@connect(({ JPCLMOfClaimAssessmentController, user }) => ({
  claimProcessData: lodash.get(JPCLMOfClaimAssessmentController, 'claimProcessData'),
  claimEntities: lodash.get(JPCLMOfClaimAssessmentController, 'claimEntities'),
  userId: lodash.get(user, 'currentUser.userId'),
}))
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class JPCLMOfAssessmentReview extends Component {
  static contextTypes = {
    setDataForSubmit: PropTypes.func,
    setHeaderInfo: PropTypes.func,
    setButtonStatus: PropTypes.func,
    taskDetail: PropTypes.object,
    setAfterHook: PropTypes.func,
  };

  static childContextTypes = {
    taskNotEditable: PropTypes.bool,
    isHideRequireIcon: PropTypes.bool,
    isValidateWarning: PropTypes.bool,
  };

  // state = {
  //   benefitOpen: false,
  // };

  getChildContext() {
    return {
      taskNotEditable: true,
      isHideRequireIcon: true,
      isValidateWarning: false,
    };
  }

  componentDidMount = async () => {
    await this.getClaimData();
    this.getDropdown();
    this.openAllocationDataChannel();
  };

  getClaimData = async () => {
    const { dispatch, taskDetail = {}, businessData } = this.props;
    const {
      inquiryBusinessNo,
      businessNo,
      caseCategory,
      processInstanceId,
      taskId,
      taskDefKey,
      assignee,
      taskStatus,
    } = taskDetail;
    // 这是个游离在claim case外的特殊值，只有没有completed，就一直取最新的值
    if (taskStatus !== 'completed') {
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
        taskId,
        activityCode: taskDefKey,
        assignee,
        businessData,
      },
    });
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/clearClaimProcessData',
    });

    // 初始化payment allocation
    dispatch({
      type: 'paymentAllocation/resetAllocation',
    });
  };

  getDropdown = () => {
    const { dispatch } = this.props;
    const { taskDetail } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo: taskDetail.businessNo,
      },
    });
    // select start
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.ClaimApprovalAndAssessmentReview,
    });
  };

  // handleBenefitOpen = () => {
  //   this.setState({
  //     benefitOpen: true,
  //   });
  // };

  // handleBenefitClose = () => {
  //   this.setState({
  //     benefitOpen: false,
  //   });
  // };

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
    });
  };

  handleAllocationClose = () => {
    const { dispatch } = this.props;

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
    const { taskDetail } = this.props;

    return (
      <FormItemContext.Provider value={{ isHideRequireIcon: true }}>
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
        <AssessmentHandle handleBenefitOpen={this.handleAllocationOpen} />
        <IncidentList />
        <PaymentAllocation onCancel={this.handleAllocationClose} />
        <MedicalSearchModal />
      </FormItemContext.Provider>
    );
  }
}

export default JPCLMOfAssessmentReview;
