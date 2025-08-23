import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import AssessmentHandle from './ClaimResult/AssessmentHandle';
import AssessmentResult from './ClaimResult/AssessmentResult';
import InsuredInfo from './Insured/InsuredInfo';
import ClaimantInfo from './Claimant/ClaimantInfo';
import IncidentList from './Incident/IncidentList';
import styles from './claimHistory.less';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

@connect(({ PHCLMOfAppealCaseController }) => ({
  claimProcessData: PHCLMOfAppealCaseController.claimProcessData,
}))
class ClaimApprove extends Component {
  static childContextTypes = {
    taskNotEditable: PropTypes.bool,
  };

  getChildContext() {
    const { taskNotEditable } = this.props;

    return {
      taskNotEditable,
    };
  }

  componentDidMount = async () => {
    const { dispatch, businessData }: any = this.props;

    dispatch({
      type: 'PHCLMOfAppealCaseController/saveClaimProcessData',
      payload: businessData,
    });
    this.getDropdown();
    this.openAllocationDataChannel();
  };

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'PHCLMOfAppealCaseController/clearClaimProcessData',
    });

    dispatch({
      type: 'formCommonController/clearForm',
    });

    // 初始化payment allocation
    dispatch({
      type: 'paymentAllocation/resetAllocation',
    });
  };

  getDropdown = () => {
    const { dispatch, params, businessData }: any = this.props;
    const businessNo = params.claimNo;
    const { claimAppealOriginalCase } = businessData;

    dispatch({
      type: 'PHCLMOfAppealCaseController/queryListPolicy',
      payload: {
        claimNo: claimAppealOriginalCase?.initiallyClaimNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: [
        'Gender',
        'IdentityType',
        'OrganizationIdentityType',
        'InsuredState',
        'CauseOfIncident',
        'TreatmentType',
        'PayeeType',
        'ClaimDecision',
        'ClaimType',
        'DiagnosisType',
        'PaymentMethod',
        'AmountType',
        'PolicyType',
        'PayablesType',
        'Dropdown_COM_SubmissionChannel',
        'Dropdown_CLM_PHClaimType',
        'Dropdown_CLM_PHRelationshipwithInsured',
        'Dropdown_CLM_PHClaimDecision',
        'Dropdown_CLM_PHDenyReason',
        'Dropdown_CLM_PHRedFlag',
        'Dropdown_CLM_CriticalIllness',
      ],
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

  openAllocationDataChannel = () => {
    const { dispatch } = this.props;
    const claimData: any = dispatch({
      type: 'PHCLMOfAppealCaseController/getDenormalizedData',
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
      type: 'PHCLMOfAppealCaseController/getDenormalizedData',
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
          type: 'PHCLMOfAppealCaseController/savePaymentAllocation',
          payload: claimData,
        });
      }
    });
  };

  render() {
    return (
      <>
        <div className={`${styles.content} ${styles['black-scroll']}`}>
          <div className={styles.wrap}>
            <Row gutter={24}>
              <Col {...layout}>
                <InsuredInfo />
              </Col>
              <Col {...layout}>
                <ClaimantInfo />
              </Col>
            </Row>
            <AssessmentResult />
            <AssessmentHandle handleBeneficiaryOpen={this.handleAllocationOpen} />
            <IncidentList />
          </div>
        </div>
        <PaymentAllocation onCancel={this.handleAllocationClose} />
        <HospitalIncomeModal title="modal" />
        <OutPatientModal />
        <InpatientPerDayModal />
      </>
    );
  }
}

export default ClaimApprove;
