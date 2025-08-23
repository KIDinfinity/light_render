import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import HistorySider from 'claim/pages/HistorySider';
import FurtherClaimModal from 'claim/pages/HongKong/FurtherClaim';
import Provider from 'bpm/pages/OWBEntrance/Context/Provider';
import PageContainer from 'basic/components/Elements/PageContainer';
import BasicInfo from './BasicInfo';

import SectionTitle from 'claim/components/SectionTitle';

import AssessmentHandle from '../ManualAssessment/ClaimResult/AssessmentHandle';
import AssessmentResult from '../ManualAssessment/ClaimResult/AssessmentResult';
import ServiceAgent from '../ManualAssessment/ServiceAgent';
import Insured from '../ManualAssessment/Insured';
import Claimant from '../ManualAssessment/Claimant';
import { IncidentV2 } from '../ManualAssessment/V2';

import styles from './index.less';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

@connect(({ IDCLMOfClaimAssessmentController, workspaceHistory }) => ({
  claimProcessData: IDCLMOfClaimAssessmentController.claimProcessData,
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
  };

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'IDCLMOfClaimAssessmentController/clearClaimProcessData',
    });

    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  getDropdown = () => {
    const { dispatch, params }: any = this.props;
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

  handleAllocationOpen = () => {
    const { dispatch } = this.props;
    const result: any = dispatch({
      type: 'THCLMOfClaimAssessmentController/getDenormalizedData',
    });

    result?.then?.((claimData: any) => {
      dispatch({
        type: 'paymentAllocation/allocationOpen',
        payload: { claimData },
      });
      this.handleBeneficiaryOpen();
    });
  };

  render() {
    const { claimProcessData, getCaseNoByBusinessNo }: any = this.props;
    const caseCategory = lodash.get(claimProcessData, 'caseCategory');
    const claimNo = lodash.get(claimProcessData, 'claimNo');
    return (
      <PageContainer pageConfig={{}}>
        <TaskDetailHeader
          taskStatus=""
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail.title.claim-inquiry',
          })}
        >
          {claimProcessData && (
            <Provider {...this.props}>
              <BasicInfo
                caseNo={getCaseNoByBusinessNo}
                caseCategory={claimProcessData.caseCategory}
                claimProcessData={claimProcessData}
              />
            </Provider>
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
              <SectionTitle
                title={formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.title.assessment-information',
                })}
              />
              <AssessmentResult />
              <AssessmentHandle handleBeneficiaryOpen={this.handleAllocationOpen} />
              <IncidentV2 />
            </div>
          </div>
          <HospitalIncomeModal title="modal" />
          <OutPatientModal />
          <InpatientPerDayModal />
          <FurtherClaimModal namespace="IDCLMOfClaimAssessmentController" />
        </div>
      </PageContainer>
    );
  }
}

export default ClaimApprove;
