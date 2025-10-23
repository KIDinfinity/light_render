import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import classnames from 'classnames';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';
import Header from './Header';
import Sider from './Sider';
import PaymentAllocation from '../ManualAssessment/Modules/PaymentAllocation';
import AssessmentResult from '../ManualAssessment/Modules/ClaimResult/AssessmentResult';
import Insured from '../ManualAssessment/Modules/Insured';
import ServiceAgent from '../ManualAssessment/Modules/ServiceAgent/ServiceAgent';
import PageContainer from 'basic/components/Elements/PageContainer';
import Claimant from '../ManualAssessment/Modules/Claimant';
import IncidentList from '../ManualAssessment/Modules/Incident/List';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import PopUp from '../ManualAssessment/Modules/PopUp';

import { NAMESPACE } from '../ManualAssessment/activity.config';

import BasicInfo from './BasicInfo';
import styles from './index.less';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

@connect(({ [NAMESPACE]: modelnamepsace, navigatorInformationController }) => ({
  claimProcessData: modelnamepsace.claimProcessData,
  caseDetail: modelnamepsace.caseDetail,
  caseNo: navigatorInformationController?.processInstanceId,
}))
class ClaimHistory extends Component {
  static childContextTypes = {
    taskNotEditable: PropTypes.bool,
  };

  state = {
    beneficiaryModeOpen: false,
  };

  getChildContext() {
    const { taskNotEditable }: any = this.props;

    return {
      taskNotEditable,
    };
  }

  componentDidMount = async () => {
    this.getDropdown();
    this.decisionMapping();
    this.openAllocationDataChannel();
  };

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: `${NAMESPACE}/clearClaimProcessData`,
    });

    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  decisionMapping = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: `${NAMESPACE}/decisionMapping`,
    });
  };

  getDropdown = () => {
    const { dispatch, params }: any = this.props;
    const businessNo = params.claimNo;

    dispatch({
      type: `${NAMESPACE}/queryListPolicy`,
      payload: {
        claimNo: businessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.JPhistory,
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
    dispatch({
      type: `${NAMESPACE}/getAgentNoList`,
      payload: {
        claimNo: businessNo,
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

  openAllocationDataChannel = () => {
    const { dispatch } = this.props;
    const claimData: any = dispatch({
      type: `${NAMESPACE}/getDenormalizedData`,
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
      type: `${NAMESPACE}/getDenormalizedData`,
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
          type: `${NAMESPACE}/savePaymentAllocation`,
          payload: claimData,
        });
      }
    });
    this.handleBeneficiaryClose();
  };

  render() {
    const { claimProcessData, params, caseDetail, caseNo }: any = this.props;

    return (
      <PageContainer pageConfig={{}}>
        <div className={styles.container}>
          <Header
            inquiryApplicationNo={claimProcessData?.inquiryClaimNo}
            activityKey={caseDetail?.activityKey}
          >
            {claimProcessData && (
              <BasicInfo
                caseNo={params?.caseNo || caseNo}
                caseCategory={params?.caseCategory || claimProcessData.caseCategory}
                claimProcessData={claimProcessData}
              />
            )}
          </Header>
          {/* 临时使用的简易Sider */}
          {tenant.isJP() && <Sider />}
          <div
            className={classnames({
              [styles.content]: true,
              [styles['black-scroll']]: true,
              [styles.withSider]: tenant.isJP(),
            })}
          >
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
              <AssessmentResult />

              <IncidentList />
            </div>
          </div>
          <PaymentAllocation />
          <HospitalIncomeModal title="modal" />
          <OutPatientModal />
          <InpatientPerDayModal />
          <PopUp />
        </div>
      </PageContainer>
    );
  }
}

export default ClaimHistory;
