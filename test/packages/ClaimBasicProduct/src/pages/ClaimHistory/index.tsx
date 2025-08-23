import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';
import SectionTitle from 'claim/components/SectionTitle';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import HistorySider from 'claim/pages/HistorySider';
import AssessmentHandle from '../ManualAssessment/ClaimResult/AssessmentHandle';
import AssessmentResult from '../ManualAssessment/ClaimResult/AssessmentResult';
import InsuredInfo from '../ManualAssessment/Insured/InsuredInfo';
import ClaimantInfo from '../ManualAssessment/Claimant/ClaimantInfo';
import IncidentList from '../ManualAssessment/Incident/IncidentList';
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import dictionaryConfig from '../DictionaryByTypeCodes.config';

import BasicInfo from './BasicInfo';
import styles from './index.less';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

@connect(({ bpOfClaimAssessmentController, workspaceHistory }) => ({
  claimProcessData: bpOfClaimAssessmentController.claimProcessData,
  getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
}))
class ClaimApprove extends Component {
  static childContextTypes = {
    taskNotEditable: PropTypes.bool,
  };

  state = {
    beneficiaryModeOpen: false,
  };

  getChildContext() {
    const { taskNotEditable } = this.props;

    return {
      taskNotEditable,
    };
  }

  componentDidMount = async () => {
    this.getDropdown();
    this.openAllocationDataChannel();
  };

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'bpOfClaimAssessmentController/clearClaimProcessData',
    });

    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  getDropdown = () => {
    const { dispatch, params }: any = this.props;
    const businessNo = params.claimNo;
    const { caseCategory } = params;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.[caseCategory]?.history,
    });
    dispatch({
      type: 'bpOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo: businessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: [
        'Gender',
        'IdentityType',
        'OrganizationIdentityType',
        'InsuredState',
        'Relationship',
        'ClaimType',
        'CauseOfIncident',
        'TreatmentType',
        'PayeeType',
        'DiagnosisType',
        'PaymentMethod',
        'Dropdown_CLM_ClaimDecision',
        'Dropdown_CLM_AssessmentDecision',
        'Dropdown_CLM_ExGratiaCode',
        'AmountType',
        'PolicyType',
        'PayablesType',
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
    const { claimProcessData, getCaseNoByBusinessNo }: any = this.props;

    const caseCategory = lodash.get(claimProcessData, 'caseCategory');
    const claimNo = lodash.get(claimProcessData, 'claimNo');
    return (
      <div>
        <TaskDetailHeader
          taskStatus=""
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail.title.claim-inquiry',
          })}
        >
          {claimProcessData && (
            <BasicInfo
              caseNo={getCaseNoByBusinessNo}
              caseCategory={claimProcessData.caseCategory}
              claimProcessData={claimProcessData}
            />
          )}
        </TaskDetailHeader>
        <div className={styles.container}>
          <HistorySider
            claimNo={claimNo}
            caseCategory={caseCategory}
            caseNo={getCaseNoByBusinessNo}
          />
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
              <SectionTitle
                title={formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.title.assessment-information',
                })}
              />
              <AssessmentResult />
              <AssessmentHandle handleBeneficiaryOpen={this.handleAllocationOpen} />
              <IncidentList />
            </div>
          </div>
        </div>
        <PaymentAllocation onCancel={this.handleAllocationClose} />
        <HospitalIncomeModal title="modal" />
        <OutPatientModal />
        <InpatientPerDayModal />
      </div>
    );
  }
}

export default ClaimApprove;
