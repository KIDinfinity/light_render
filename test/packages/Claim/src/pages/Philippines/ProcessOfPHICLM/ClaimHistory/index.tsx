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
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import { denormalizeClaimData } from '@/utils/claimUtils';
import AssessmentHandle from '../ManualAssessment/ClaimResult/AssessmentHandle';
import AssessmentResult from '../ManualAssessment/ClaimResult/AssessmentResult';
import InsuredInfo from '../ManualAssessment/Insured/InsuredInfo';
import ClaimantInfo from '../ManualAssessment/Claimant/ClaimantInfo';
import IncidentList from '../ManualAssessment/Incident/IncidentList';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import BasicInfo from './BasicInfo';
import styles from './index.less';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

@connect(({ PHCLMOfClaimAssessmentController, workspaceHistory }) => ({
  claimProcessData: PHCLMOfClaimAssessmentController.claimProcessData,
  claimEntities: PHCLMOfClaimAssessmentController.claimEntities,
  getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
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
    this.getDropdown();
    this.openAllocationDataChannel();
  };

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;
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
  };

  getDropdown = () => {
    const { dispatch, params }: any = this.props;
    const businessNo = params.claimNo;

    dispatch({
      type: 'PHCLMOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo: businessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.PHHistory,
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
  };

  render() {
    const { claimProcessData, getCaseNoByBusinessNo, claimEntities }: any = this.props;
    const caseCategory = lodash.get(claimProcessData, 'caseCategory');
    const claimNo = lodash.get(claimProcessData, 'claimNo');
    const result = denormalizeClaimData(claimProcessData, claimEntities);
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
            result={result}
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
