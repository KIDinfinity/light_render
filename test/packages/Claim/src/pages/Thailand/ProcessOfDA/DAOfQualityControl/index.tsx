import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import SectionTitle from 'claim/components/SectionTitle';
import { isReimbursement } from 'claim/pages/Thailand/flowConfig';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import InsuredInfo from './Insured/InsuredInfo';
import IncidentList from './Incident/IncidentList';
import PayeeInfoList from './Payee/PayeeInfoList';
import styles from './DAOfAssessment.less';
import FlowUpClaim from '../../FollowUpClaim';
import dictionaryConfig from './DictionaryByTypeCodes.config';
interface IState {
  init: boolean;
}

@connect(({ daOfClaimCaseController, user, formCommonController }: any) => ({
  claimProcessData: daOfClaimCaseController.claimProcessData,
  claimEntities: daOfClaimCaseController.claimEntities,
  userId: lodash.get(user, 'currentUser.userId'),
  submited: formCommonController.submited,
  payeeList: lodash.get(daOfClaimCaseController, 'claimProcessData.payeeList'),
}))
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class DAOfAssessment extends Component<{}, IState> {
  handleSaveIntervalFlag = 0;

  componentDidMount = async () => {
    const { businessData, dispatch, taskDetail } = this.props;
    this.handleSetBusinessData({ businessData });
    await this.getDropdown();
  };

  handleSetBusinessData = async ({ businessData }) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'daOfClaimCaseController/saveClaimProcessData',
      payload: businessData,
    });
    dispatch({
      type: 'daOfClaimCaseController/retrieve3CiIndicator',
    });
    // 初始化followUp
    dispatch({
      type: 'followUpClaim/initFollowUpClaim',
      payload: {
        ...businessData,
      },
    });
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'daOfClaimCaseController/clearClaimProcessData',
    });
    dispatch({
      type: 'insured360/clearInsuredReducer',
    });
    dispatch({
      type: 'followUpClaim/clearFlowUp',
    });
  };

  getDropdown = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THDAQualityControl,
    });
    dispatch({
      type: 'dictionaryController/medicalProviderDropdown',
    });
    dispatch({
      type: 'dictionaryController/surgeryProcedureDropdown',
    });
  };

  getClaimCaseData = () => {
    const { claimProcessData, claimEntities }: any = this.props;
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));

    return content;
  };

  render() {
    const { claimProcessData }: any = this.props;
    const caseCategory = lodash.get(claimProcessData, 'caseCategory');

    return (
      <div className={classNames(styles.da_assessment, 'assessment_primary')}>
        <FlowUpClaim getClaimCaseData={this.getClaimCaseData} showAll={false} />
        <InsuredInfo />
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
        <IncidentList />
        {isReimbursement(caseCategory) && (
          <SectionTitle
            title={formatMessageApi({
              Label_BIZ_Claim:
                'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
            })}
          />
        )}
        {isReimbursement(caseCategory) && <PayeeInfoList />}
      </div>
    );
  }
}

export default DAOfAssessment;
