import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionTitle from 'claim/components/SectionTitle';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import InsuredInfo from './Insured/InsuredInfo';
import AssessmentResult from './ClaimResult/AssessmentResult';
import IncidentList from './Incident/IncidentList';
import InvoiceEntireList from './Invoice/InvoiceEntireList';
import styles from './DAOfAssessment.less';

interface IState {
  showPrimary: boolean;
  incidentId?: string;
}

@connect(({ hbOfClaimAssessmentController, user, formCommonController }: any) => ({
  hbOfClaimAssessmentController,
  claimProcessData: hbOfClaimAssessmentController.claimProcessData,
  claimEntities: hbOfClaimAssessmentController.claimEntities,
}))
// @ts-ignore
@setClaimEditableHoc
class DAOfAssessment extends Component<{}, IState> {
  static contextTypes = {
    taskDetail: PropTypes.object,
  };

  state = {
    showPrimary: true,
    incidentId: '',
  };

  componentDidMount = async () => {
    const { dispatch, taskDetail } = this.props;
    await this.getClaimData();
    await this.getDropdown();
    this.getListPerConfinementLimit();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'hbOfClaimAssessmentController/clearClaimProcessData',
    });
  };

  getClaimData = async () => {
    const { dispatch, taskDetail = {} }: any = this.props;
    const { businessNo, caseCategory, processInstanceId, taskId, taskDefKey } = taskDetail;
    await dispatch({
      type: 'hbOfClaimAssessmentController/getSnapshot',
      payload: {
        processInstanceId,
        caseCategory,
        businessNo,
        taskId,
        activityCode: taskDefKey,
      },
    });
  };

  getDropdown = () => {
    const { dispatch, taskDetail } = this.props;

    dispatch({
      type: 'hbOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo: taskDetail.businessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCode',
      payload: objectToFormData({ typeCode: 'Deny_Reason_ManaulAssessment' }),
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THHBAssessment,
    });
    dispatch({
      type: 'dictionaryController/medicalProviderDropdown',
    });
  };

  handleSwitch = (showPrimary: boolean, incidentId?: string) => {
    this.setState({ showPrimary, incidentId });
  };

  getListPerConfinementLimit = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'hbOfClaimAssessmentController/getListPerConfinementLimit',
    });
  };

  handleReAssessment = async () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'commonClaimAssessmentController/reAssessment',
      payload: {
        nameSpace: 'hbOfClaimAssessmentController',
      },
    });
  };

  render() {
    const { showPrimary, incidentId } = this.state;

    return (
      <div
        className={classNames(
          styles.da_assessment,
          showPrimary ? 'assessment_primary' : 'assessment_secondary'
        )}
      >
        <InsuredInfo />
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
        <AssessmentResult />
        <div className={styles.incident_wrap}>
          <IncidentList
            handleSwitch={(incidentId: string) => this.handleSwitch(false, incidentId)}
            showPrimary={showPrimary}
          />
          <InvoiceEntireList
            incidentId={incidentId}
            handleSwitch={(incidentId: string) => this.handleSwitch(true, incidentId)}
            showPrimary={showPrimary}
          />
        </div>
      </div>
    );
  }
}

export default DAOfAssessment;
