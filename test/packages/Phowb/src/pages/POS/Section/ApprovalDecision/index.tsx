import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import lodash from 'lodash';
import FormSection from 'basic/components/Form/FormSection';
import { FormItemInput, FormItemRadioGroup, formUtils } from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
import { FormId, PosDecesionType } from '../../Enum';
import { PosDecesionList } from '../../_models/functions/getChangeInfoOption';

class PosApproval extends Component<any> {
  get isShow() {
    const { taskDefKey, isPOSHistory, approvalPosDecision, inforcePosDecision } = this.props;

    return (
      [TaskDefKey.PH_POS_ACT003, TaskDefKey.PH_POS_ACT004].includes(taskDefKey) ||
      (isPOSHistory && !lodash.isEmpty(approvalPosDecision) && lodash.isEmpty(inforcePosDecision))
    );
  }

  get isNotEditable() {
    const { taskDefKey } = this.props;
    return !lodash.includes([TaskDefKey.PH_POS_ACT003, TaskDefKey.PH_POS_ACT006], taskDefKey);
  }

  render() {
    const {
      form,
      approvalPosDecision: { posDecision },
      taskNotEditable,
    } = this.props;
    const posDecisionValue = formUtils.queryValue(posDecision);
    return (
      this.isShow && (
        <FormSection
          form={form}
          formId={FormId.PosApproval}
          title="POSDecision"
          layConf={{
            default: 12,
            PosDecesion: 6,
            declineReason: 18,
          }}
          isMargin
          formatType="Label_BIZ_POS"
        >
          <FormItemRadioGroup
            name="PosDecesion"
            form={form}
            formName="posDecision"
            dicts={PosDecesionList}
            disabled={taskNotEditable || this.isNotEditable}
            dictCode="code"
            dictName="name"
            labelId="POSDecision"
          />
          <FormItemInput
            form={form}
            name="declineReason"
            formName="declineReason"
            labelId="DeclineReason"
            disabled={
              posDecisionValue === PosDecesionType.Accepted || taskNotEditable || this.isNotEditable
            }
            required={posDecisionValue === PosDecesionType.Declined}
          />
        </FormSection>
      )
    );
  }
}

export default connect(
  ({ phowbDataCaptureController, formCommonController, claimEditable, processTask }: any) => ({
    approvalPosDecision:
      phowbDataCaptureController.claimProcessData.posDataDetail?.approvalPosDecision || {},
    taskNotEditable: claimEditable.taskNotEditable,
    taskDefKey: processTask?.getTask?.taskDefKey,
    validating: formCommonController.validating,
    isPOSHistory: phowbDataCaptureController.isPOSHistory,
    inforcePosDecision:
      phowbDataCaptureController.claimProcessData.posDataDetail?.inforcePosDecision || {},
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
              target: 'updatePosApproval',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveFormData',
              target: 'updatePosApproval',
              payload: {
                changedFields,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props) {
      const { approvalPosDecision }: any = props;
      return formUtils.mapObjectToFields({
        posDecision: approvalPosDecision.posDecision,
        declineReason: approvalPosDecision.declineReason,
      });
    },
  })(PosApproval)
);
