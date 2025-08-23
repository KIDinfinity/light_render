import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { denormalizeClaimData } from '@/utils/claimUtils';
import SectionTitle from 'claim/components/SectionTitle';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import InsuredInfo from './Insured/InsuredInfo';
import IncidentList from './Incident/IncidentList';
import FlowUpClaim from '../../FollowUpClaim';
import dictionaryConfig from './DictionaryByTypeCodes.config';

@connect(({ apOfClaimCaseController, user, formCommonController }: any) => ({
  claimProcessData: apOfClaimCaseController.claimProcessData,
  claimEntities: apOfClaimCaseController.claimEntities,
  userId: lodash.get(user, 'currentUser.userId'),
  submited: formCommonController.submited,
}))
@setClaimEditableHoc
@changeWorkSpaceHoc
@setInformationHoc
@setEnvoyHoc
@setInsured360Hoc
class APOfQualityControl extends Component {
  componentDidMount = async () => {
    const { businessData, dispatch, taskDetail } = this.props;
    await dispatch({
      type: 'apOfClaimCaseController/saveClaimProcessData',
      payload: businessData,
    });
    dispatch({
      type: 'apOfClaimCaseController/retrieve3CiIndicator',
    });
    // 初始化followUp
    dispatch({
      type: 'followUpClaim/initFollowUpClaim',
      payload: {
        ...businessData,
      },
    });
    await this.getDropdown();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'apOfClaimCaseController/clearClaimProcessData',
    });
    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
    dispatch({
      type: 'followUpClaim/clearFlowUp',
    });
  };

  getDropdown = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THAPQualityControl,
    });
    dispatch({
      type: 'dictionaryController/medicalProviderDropdown',
    });
  };

  getClaimCaseData = () => {
    const { claimProcessData, claimEntities }: any = this.props;
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));

    return content;
  };

  render() {
    return (
      <div>
        <FlowUpClaim getClaimCaseData={this.getClaimCaseData} showAll={false} />
        <InsuredInfo />
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
        <IncidentList />
      </div>
    );
  }
}

export default APOfQualityControl;
