import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection, { FormItemDatePicker, FormItemInput } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { FormId, TransactionTypeCode, PosDecesionType } from '../../Enum';

class LATrack extends Component<any> {
  get isShow() {
    const { taskDefKey, isPOSHistory } = this.props;
    return (
      [TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT010].includes(taskDefKey) || isPOSHistory
    );
  }

  get isNotEditable() {
    const { taskDefKey } = this.props;
    return !lodash.includes([TaskDefKey.PH_POS_ACT006], taskDefKey);
  }

  get regenerateContractCheck() {
    const { transactionType, taskDefKey, requestForIssuanceOfDuplicatePolicy } = this.props;
    return (
      taskDefKey === TaskDefKey.PH_POS_ACT006 &&
      formUtils.queryValue(transactionType) === TransactionTypeCode.IssuanceDuplicatePolicy &&
      !Boolean(formUtils.queryValue(requestForIssuanceOfDuplicatePolicy.regenerateContract))
    );
  }

  get isNotMailsCertificatesCorrespondences() {
    const { transactionType } = this.props;
    return (
      formUtils.queryValue(transactionType) !== TransactionTypeCode.MailsCertificatesCorrespondences
    );
  }

  get isAtLeastOneField() {
    const { form } = this.props;
    const lifeAsiaUpdateCompletedDate = form.getFieldValue('lifeAsiaUpdateCompletedDate');
    const unCompleteReason = form.getFieldValue('unCompleteReason');
    return !lifeAsiaUpdateCompletedDate && !unCompleteReason;
  }

  get isInforceDeclined() {
    const { inforcePosDecision } = this.props;
    return formUtils.queryValue(inforcePosDecision?.posDecision) === PosDecesionType.Declined;
  }

  onDateChange = (data: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: `phowbDataCaptureController/updateLATrack`,
      payload: {
        changedFields: {
          unCompleteReason: null,
        },
      },
    });
  };

  onBlur = () => {
    const { laUpdateTrack, dispatch } = this.props;
    if (
      formUtils.queryValue(laUpdateTrack?.unCompleteReason) &&
      formUtils.queryValue(laUpdateTrack?.lifeAsiaUpdateCompletedDate)
    ) {
      dispatch({
        type: `phowbDataCaptureController/updateLATrack`,
        payload: {
          changedFields: {
            lifeAsiaUpdateCompletedDate: null,
          },
        },
      });
    }
  };

  render() {
    const { form, taskNotEditable, submited } = this.props;

    return (
      <FormSection
        form={form}
        formId={FormId.LATrack}
        title={
          <>
            {formatMessageApi({
              Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.LATrack',
            })}

            {submited &&
              this.isAtLeastOneField &&
              !this.regenerateContractCheck &&
              this.isNotMailsCertificatesCorrespondences &&
              !this.isInforceDeclined && (
                <ErrorTooltipManual
                  // @ts-ignore
                  manualErrorMessage={formatMessageApi(
                    { Label_COM_WarningMessage: 'ERR_000011' },
                    formatMessageApi({
                      Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.LATrack',
                    })
                  )}
                />
              )}
          </>
        }
        layConf={12}
        isMargin
      >
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable || this.isNotEditable}
          formName="lifeAsiaUpdateCompletedDate"
          labelId="venus_claim.phowb.dataCapture.label.LATrack.LACompletedDate"
          format="L"
          //@ts-ignore
          onChange={this.onDateChange}
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable || this.isNotEditable}
          formName="unCompleteReason"
          onBlur={this.onBlur}
          labelId="venus_claim.phowb.dataCapture.label.LATrack.uncompleteReason"
        />
      </FormSection>
    );
  }
}

export default connect(
  ({ claimEditable, phowbDataCaptureController, processTask, formCommonController }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    laUpdateTrack: phowbDataCaptureController.claimProcessData.posDataDetail?.laUpdateTrack || {},
    taskDefKey: processTask?.getTask?.taskDefKey,
    submited: formCommonController.submited,
    validating: formCommonController.validating,
    transactionType:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.posRequestInformation
        ?.transactionType,
    requestForIssuanceOfDuplicatePolicy:
      phowbDataCaptureController.claimProcessData?.posDataDetail
        ?.requestForIssuanceOfDuplicatePolicy || {},
    isPOSHistory: phowbDataCaptureController.isPOSHistory,
    inforcePosDecision:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.inforcePosDecision,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveEntry',
              target: 'updateLATrack',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'phowbDataCaptureController/saveFormData',
            target: 'updateLATrack',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { laUpdateTrack }: any = props;

      return formUtils.mapObjectToFields(laUpdateTrack);
    },
  })(LATrack)
);
