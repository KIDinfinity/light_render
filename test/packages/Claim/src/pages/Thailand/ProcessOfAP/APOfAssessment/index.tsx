import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { denormalizeClaimData } from '@/utils/claimUtils';
import SectionTitle from 'claim/components/SectionTitle';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import InsuredInfo from './Insured/InsuredInfo';
import AssessmentResult from './ClaimResult/AssessmentResult';
import IncidentList from './Incident/IncidentList';
import AssessmentHandle from './ClaimResult/AssessmentHandle';
import DecisionModal from './DecisionModal';
import FlowUpClaim from '../../FollowUpClaim';

interface IProps {
  dispatch: Dispatch<any>;
  showRequiredError?: boolean;
}

@connect(({ apOfClaimAssessmentController, user, formCommonController }: any) => ({
  claimProcessData: apOfClaimAssessmentController.claimProcessData,
  claimEntities: apOfClaimAssessmentController.claimEntities,
  userId: lodash.get(user, 'currentUser.userId'),
  submited: formCommonController.submited,
}))
@setClaimEditableHoc
@changeWorkSpaceHoc
@setInformationHoc
@setEnvoyHoc
@setInsured360Hoc
class APO extends Component<IProps> {
  taskHooks: any;

  state = {
    reAssessValidatingLoading: false,
    reAssTrigger: false,
  };

  componentDidMount = async () => {
    const { businessData, dispatch } = this.props;
    await dispatch({
      type: 'apOfClaimAssessmentController/saveClaimProcessData',
      payload: businessData,
    });
    dispatch({
      type: 'apOfClaimAssessmentController/retrieve3CiIndicator',
    });
    // 初始化followUp
    dispatch({
      type: 'followUpClaim/initFollowUpClaim',
      payload: {
        ...businessData,
      },
    });
    await this.getDropdown();
    dispatch({
      type: 'apOfClaimAssessmentController/initCompareClaimData',
      payload: {
        businessData,
      },
    });
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'apOfClaimAssessmentController/clearClaimProcessData',
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

  componentDidUpdate(prevProps): void {
    if (prevProps?.showRequiredError && !this.props.showRequiredError && this.state.reAssTrigger) {
      this.setState({ reAssTrigger: false });
    }
  }

  getDropdown = () => {
    const { dispatch, taskDetail } = this.props;

    dispatch({
      type: 'apOfClaimAssessmentController/queryListPolicy',
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
      payload: dictionaryConfig?.THAPAssessment,
    });
    dispatch({
      type: 'dictionaryController/medicalProviderDropdown',
    });
  };

  handleReAssessment = async () => {
    const { dispatch, showRequiredError } = this.props;
    this.setState({ reAssessValidatingLoading: true });
    await dispatch({
      type: 'formCommonController/handleSubmited',
    });
    const errors = await dispatch({
      type: 'apOfClaimAssessmentController/validateFields',
      payload: {
        skipValidateFormIds: [
          'claimPayableListItem-',
          'treatmentPayableListItem-',
          'treatmentPayableListItemOfAI-',
          'invoicePayableListItem-',
          'treatmentPayableListItemAdd',
          'invoiceItemPayableItemAdd',
          '-claimDecision',
        ],
        onlyRequired: true,
      },
    });

    if (
      (!lodash.isEmpty(errors) &&
        lodash
          .chain(errors)
          .flatMap()
          .some(
            (item) => item.message === formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })
          )
          .value()) ||
      showRequiredError
    ) {
      this.setState({ reAssessValidatingLoading: false, reAssTrigger: true });
      return;
    }

    this.setState({ reAssessValidatingLoading: false });
    await dispatch({
      type: 'commonClaimAssessmentController/reAssessment',
      payload: {
        nameSpace: 'apOfClaimAssessmentController',
      },
    });
    await dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };

  getClaimCaseData = () => {
    const { claimProcessData, claimEntities }: any = this.props;
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));

    return content;
  };

  render() {
    const { showRequiredError }: any = this.props;

    const { reAssTrigger, reAssessValidatingLoading } = this.state;

    return (
      <div>
        <FlowUpClaim getClaimCaseData={this.getClaimCaseData} showAll />
        <InsuredInfo />
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
        <AssessmentResult />
        <AssessmentHandle
          handleReAssessment={this.handleReAssessment}
          reAssTrigger={reAssTrigger}
          showRequiredError={showRequiredError}
          reAssessValidatingLoading={reAssessValidatingLoading}
        />
        <IncidentList />
        <DecisionModal />
      </div>
    );
  }
}

export default APO;
