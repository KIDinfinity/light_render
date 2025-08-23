import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { Row, Col, notification } from 'antd';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import handleMessageModal from '@/utils/commonMessage';
import SectionTitle from 'claim/components/SectionTitle';
import type { IDictionary } from '@/dtos/dicts';
import { FormItemContext } from 'basic/components/Form';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';

import PaymentAllocation from 'claim/pages/PaymentAllocation';
import IncidentList from '../ManualAssessment/Incident/IncidentList';
import AssessmentHandle from '../ManualAssessment/ClaimResult/AssessmentHandle';
import AssessmentResult from '../ManualAssessment/ClaimResult/AssessmentResult';
import ClaimantInfo from '../ManualAssessment/Claimant/ClaimantInfo';
import InsuredInfo from '../ManualAssessment/Insured/InsuredInfo';
import dictionaryConfig from '../DictionaryByTypeCodes.config';

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
}

@connect(({ bpOfClaimAssessmentController, user, formCommonController }: any) => ({
  claimProcessData: bpOfClaimAssessmentController.claimProcessData,
  claimEntities: bpOfClaimAssessmentController.claimEntities,
  userId: lodash.get(user, 'currentUser.userId'),
  submited: formCommonController.submited,
}))
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class ClaimApprove extends Component<IProps> {
  static childContextTypes = {
    isHideRequireIcon: PropTypes.bool,
  };

  state = {
    beneficiaryModeOpen: false,
  };

  getChildContext() {
    return {
      isHideRequireIcon: true,
    };
  }

  componentDidMount = async () => {
    await this.getClaimData();
    await this.getDropdown();
    this.openAllocationDataChannel();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'bpOfClaimAssessmentController/clearClaimProcessData',
    });

    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  getClaimData = async () => {
    const { dispatch, businessData = {} }: any = this.props;

    await dispatch({
      type: 'bpOfClaimAssessmentController/saveClaimProcessData',
      payload: businessData,
    });
  };

  getDropdown = () => {
    const { dispatch, taskDetail }: any = this.props;
    const { caseCategory, activityKey, taskDefKey } = lodash.pick(taskDetail, [
      'caseCategory',
      'activityKey',
      'taskDefKey',
    ]);

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.[caseCategory]?.[activityKey || taskDefKey],
    });

    dispatch({
      type: 'bpOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo: taskDetail.businessNo,
      },
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
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const submitData = {
      ...content,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
      activityKey: taskDetail.taskDefKey,
    };
    const response = await dispatch({
      type: 'bpOfClaimAssessmentController/reAssessment',
      payload: submitData,
    });

    if (response && response.success) {
      notification.success({
        message: 'Re-Assessment successfully!',
      });
    } else {
      handleMessageModal(response.promptMessages);
    }
  };

  openAllocationDataChannel = () => {
    const { dispatch } = this.props;
    const claimData: any = dispatch({
      type: 'bpOfClaimAssessmentController/getDenormalizedData',
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
      type: 'bpOfClaimAssessmentController/getDenormalizedData',
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
          type: 'bpOfClaimAssessmentController/savePaymentAllocation',
          payload: claimData,
        });
      }
    });
    this.handleBeneficiaryClose();
  };

  render() {
    return (
      <FormItemContext.Provider value={{ isHideRequireIcon: true }}>
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
          handleReAssessment={this.handleReAssessment}
        />
        <IncidentList />
        <PaymentAllocation onCancel={this.handleAllocationClose} />
        <HospitalIncomeModal title="modal" />
        <OutPatientModal />
        <InpatientPerDayModal />
      </FormItemContext.Provider>
    );
  }
}

export default ClaimApprove;
