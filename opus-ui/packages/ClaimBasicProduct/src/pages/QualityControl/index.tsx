import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Row, Col } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import SectionTitle from 'claim/components/SectionTitle';
import InsuredInfo from '../DataCapture/Insured/InsuredInfo';
import ClaimantInfo from '../DataCapture/Claimant/ClaimantInfo';
import IncidentList from '../DataCapture/Incident/IncidentList';
import PayeeInfo from '../DataCapture/Payee/PayeeInfo';
import dictionaryConfig from '../DictionaryByTypeCodes.config';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

@connect(({ bpOfDataCaptureController, user, formCommonController }: any) => ({
  claimProcessData: bpOfDataCaptureController.claimProcessData,
  claimEntities: bpOfDataCaptureController.claimEntities,
  userId: lodash.get(user, 'currentUser.userId'),
  submited: formCommonController.submited,
}))
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class BPOfQualityControl extends Component {
  componentDidMount = async () => {
    await this.getClaimData();
    this.getDropdown();
  };

  getClaimData = async () => {
    const { dispatch, businessData = {} }: any = this.props;
    await dispatch({
      type: 'bpOfDataCaptureController/saveClaimProcessData',
      payload: businessData,
    });
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'bpOfDataCaptureController/clearClaimProcessData',
    });
    dispatch({
      type: 'formCommonController/clearForm',
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
      type: 'dictionaryController/nationalityDropdown',
    });
    dispatch({
      type: 'dictionaryController/bankDropdown',
    });
    dispatch({
      type: 'dictionaryController/occupationDropdown',
    });
  };

  render() {
    return (
      <>
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
        <IncidentList />
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim:
              'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
          })}
        />
        <PayeeInfo />
      </>
    );
  }
}

export default BPOfQualityControl;
