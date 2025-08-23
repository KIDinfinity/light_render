import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemRadioGroup, FormItemInput } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { PosDecesionList } from '../../_models/functions/getChangeInfoOption';

const InforcePosDecision = (props: any) => {
  const { taskDefKey, inforcePosDecision, form, taskNotEditable } = props;

  const isNotDisabled = ![TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT003].includes(taskDefKey);
  const isDeclined = formUtils.queryValue(inforcePosDecision?.decision) === 'D';
  return (
    <FormSection
      form={form}
      formId="InforcePosDecision"
      title="POSDecision"
      layConf={6}
      isMargin
      formatType="Label_BIZ_POS"
    >
      <FormItemRadioGroup
        form={form}
        name="bank"
        labelId="venus_claim.phowb.dataCapture.label.posDecision"
        formName="decision"
        dicts={PosDecesionList}
        required
        disabled={taskNotEditable || isNotDisabled}
        dictCode="code"
        dictName="name"
      />
      <FormItemInput
        form={form}
        disabled={taskNotEditable || isNotDisabled || !isDeclined}
        required={isDeclined}
        formName="declineReason"
        labelId="venus_claim.phowb.dataCapture.label.posDecision.declineReason"
      />
    </FormSection>
  );
};

export default connect(
  ({ claimEditable, GeneralPOSPHNotCFTController, processTask, formCommonController }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    inforcePosDecision:
      GeneralPOSPHNotCFTController.claimProcessData.businessData.transactionTypes[0] || {},
    taskDefKey: processTask.getTask.taskDefKey,

    isPOSHistory: GeneralPOSPHNotCFTController.isPOSHistory,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: 'GeneralPOSPHNotCFTController/saveFormData',
          target: 'updatePosDecision',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { inforcePosDecision }: any = props;
      return formUtils.mapObjectToFields(inforcePosDecision, {});
    },
  })(InforcePosDecision)
);
