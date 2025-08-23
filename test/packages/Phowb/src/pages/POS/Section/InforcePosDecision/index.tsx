import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemRadioGroup, FormItemInput } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { PosDecesionList } from '../../_models/functions/getChangeInfoOption';
import lodash from 'lodash';

class InforcePosDecision extends Component<any> {
  get isShow() {
    const { taskDefKey, isPOSHistory, inforcePosDecision } = this.props;
    return (
      [TaskDefKey.PH_POS_ACT005, TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT010].includes(
        taskDefKey
      ) ||
      (isPOSHistory && !lodash.isEmpty(inforcePosDecision))
    );
  }

  get isNotDisabled() {
    const { taskDefKey } = this.props;
    return ![TaskDefKey.PH_POS_ACT006].includes(taskDefKey);
  }

  render() {
    const { form, taskNotEditable, inforcePosDecision } = this.props;
    const isDeclined = formUtils.queryValue(inforcePosDecision?.posDecision) === 'D';
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
          formName="posDecision"
          dicts={PosDecesionList}
          required
          disabled={taskNotEditable || this.isNotDisabled}
          dictCode="code"
          dictName="name"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable || this.isNotDisabled || !isDeclined}
          required={isDeclined}
          formName="declineReason"
          labelId="venus_claim.phowb.dataCapture.label.posDecision.declineReason"
        />
      </FormSection>
    );
  }
}

export default connect(
  ({ claimEditable, phowbDataCaptureController, processTask, formCommonController }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    inforcePosDecision:
      phowbDataCaptureController.claimProcessData.posDataDetail?.inforcePosDecision || {},
    taskDefKey: processTask.getTask.taskDefKey,
    validating: formCommonController.validating,
    isPOSHistory: phowbDataCaptureController.isPOSHistory,
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
              target: 'updatePosDecision',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveFormData',
              target: 'updatePosDecision',
              payload: {
                changedFields,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props) {
      const { inforcePosDecision }: any = props;
      return formUtils.mapObjectToFields(inforcePosDecision, {});
    },
  })(InforcePosDecision)
);
