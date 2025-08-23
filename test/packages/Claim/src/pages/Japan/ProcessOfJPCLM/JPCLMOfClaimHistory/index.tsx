import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionTitle from 'claim/components/SectionTitle';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import HistorySider from 'claim/pages/HistorySider';
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import BasicInfo from './BasicInfo';
import InsuredInfo from '../JPCLMOfAssessment/Insured/InsuredInfo';
import ClaimantInfo from '../JPCLMOfAssessment/ClaimantInfo/ClaimantInfo';
import DocTypeInfo from '../JPCLMOfAssessment/DocTypeInfo';
import AssessmentResult from '../JPCLMOfAssessment/ClaimResult/AssessmentResult';
import AssessmentHandle from '../JPCLMOfAssessmentReview/AssessmentHandle';
import IncidentList from '../JPCLMOfAssessment/Incident/IncidentList';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import { FormItemContext } from 'basic/components/Form';
import { row12 } from '../JPCLMOfAssessment/FormLayout.json';
import styles from './index.less';

@connect(({ JPCLMOfClaimAssessmentController, workspaceHistory }) => ({
  claimProcessData: JPCLMOfClaimAssessmentController?.claimProcessData,
  claimEntities: JPCLMOfClaimAssessmentController?.claimEntities,
  getCaseNoByBusinessNo: workspaceHistory?.getCaseNoByBusinessNo,
}))
class JPCLMOfManualAssessment extends Component {
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
  };

  // state = {
  //   benefitOpen: false,
  // };

  getChildContext() {
    const { taskNotEditable } = this.props;

    return {
      taskNotEditable,
      isHideRequireIcon: true,
    };
  }

  componentDidMount = async () => {
    this.openAllocationDataChannel();
    this.getDropdown();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    // 初始化payment allocation
    dispatch({
      type: 'paymentAllocation/resetAllocation',
    });
    dispatch({
      type: 'JPCLMOfClaimAssessmentController/clearClaimProcessData',
    });
  };

  getDropdown = () => {
    const { dispatch, params } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo: params.businessNo,
      },
    });
    // select start
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.JPhistory,
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
    // const { benefitOpen } = this.state;
    const { claimProcessData, getCaseNoByBusinessNo, params } = this.props;

    return (
      <FormItemContext.Provider value={{ isHideRequireIcon: true }}>
        <TaskDetailHeader
          taskStatus=""
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail.title.claim-inquiry',
          })}
        >
          {claimProcessData && (
            <BasicInfo
              caseNo={getCaseNoByBusinessNo}
              caseCategory={params?.caseCategory}
              claimProcessData={claimProcessData}
            />
          )}
        </TaskDetailHeader>
        <div className={styles.container}>
          <HistorySider
            caseNo={getCaseNoByBusinessNo}
            claimNo={lodash.get(claimProcessData, 'claimNo', '')}
            caseCategory={lodash.get(claimProcessData, 'caseCategory', '')}
          />
          <div className={`${styles.content} ${styles['black-scroll']}`}>
            <div className={styles.wrap}>
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

              <AssessmentResult />
              <AssessmentHandle handleBenefitOpen={this.handleAllocationOpen} />
              <IncidentList />
              <PaymentAllocation onCancel={this.handleAllocationClose} />
            </div>
          </div>
        </div>
       
      </FormItemContext.Provider>
    );
  }
}

export default JPCLMOfManualAssessment;
