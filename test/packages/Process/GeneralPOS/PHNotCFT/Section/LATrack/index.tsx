import React, { useCallback } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection, { FormItemDatePicker, FormItemInput } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { FormId, TransactionTypeCode, PosDecesionType } from '../../Enum';

const LATrack = (props: any) => {
  const {
    taskDefKey,
    transactionType,
    requestForIssuanceOfDuplicatePolicy,
    form,
    inforcePosDecision,
    dispatch,
    taskNotEditable,
    submited,
  } = props;
  const isNotEditable = !lodash.includes([TaskDefKey.PH_POS_ACT006], taskDefKey);
  const regenerateContractCheck =
    taskDefKey === TaskDefKey.PH_POS_ACT006 &&
    formUtils.queryValue(transactionType) === TransactionTypeCode.IssuanceDuplicatePolicy &&
    !Boolean(formUtils.queryValue(requestForIssuanceOfDuplicatePolicy.regenerateContract));
  const completedDate = form.getFieldValue('completedDate');
  const uncompletedReason = form.getFieldValue('uncompletedReason');
  const isAtLeastOneField = !completedDate && !uncompletedReason;
  const isInforceDeclined =
    formUtils.queryValue(inforcePosDecision?.decision) === PosDecesionType.Declined;
  const onDateChange = useCallback(() => {
    dispatch({
      type: `GeneralPOSPHNotCFTController/updateTrack`,
      payload: {
        changedFields: {
          uncompletedReason: null,
        },
      },
    });
  }, [dispatch]);

  return (
    <FormSection
      form={form}
      formId={FormId.LATrack}
      title={
        <>
          {formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.LATrack',
          })}

          {submited && isAtLeastOneField && !regenerateContractCheck && !isInforceDeclined && (
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
        disabled={taskNotEditable || isNotEditable}
        formName="completedDate"
        labelId="venus_claim.phowb.dataCapture.label.LATrack.LACompletedDate"
        format="L"
        //@ts-ignore
        onChange={onDateChange}
      />
      <FormItemInput
        form={form}
        disabled={taskNotEditable || isNotEditable}
        formName="uncompletedReason"
        labelId="venus_claim.phowb.dataCapture.label.LATrack.uncompleteReason"
      />
      <FormItemInput
        form={form}
        disabled
        name="PaymentNumber"
        formName="paymentNo"
        labelId="PaymentNumber"
      />
    </FormSection>
  );
};

export default connect(
  ({ claimEditable, GeneralPOSPHNotCFTController, processTask, formCommonController }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    updateTrack:
      GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionTypes?.[0]
        ?.updateTrack || {},
    taskDefKey: processTask?.getTask?.taskDefKey,
    submited: formCommonController.submited,

    transactionType:
      GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.posRequestInformation
        ?.transactionType,
    requestForIssuanceOfDuplicatePolicy:
      GeneralPOSPHNotCFTController.claimProcessData?.businessData
        ?.requestForIssuanceOfDuplicatePolicy || {},
    isPOSHistory: GeneralPOSPHNotCFTController.isPOSHistory,
    inforcePosDecision:
      GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.transactionTypes?.[0],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: 'GeneralPOSPHNotCFTController/saveFormData',
          target: 'updateTrack',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { updateTrack }: any = props;

      return formUtils.mapObjectToFields(updateTrack);
    },
  })(LATrack)
);
