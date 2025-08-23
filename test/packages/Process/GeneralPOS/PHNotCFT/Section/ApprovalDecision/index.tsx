import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import lodash from 'lodash';
import FormSection from 'basic/components/Form/FormSection';
import { FormItemInput, FormItemRadioGroup, formUtils } from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
import { FormId, PosDecesionType } from '../../Enum';
import { PosDecesionList } from '../../_models/functions/getChangeInfoOption';

const PosApproval = (props: any) => {
  const {
    taskDefKey,
    isPOSHistory,
    inforcePosDecisionEmpty,
    approvalPosDecisionEmpty,
    form,
    approvalPosDecision: { decision },
    taskNotEditable,
  } = props;
  const isShow =
    [TaskDefKey.PH_POS_ACT003, TaskDefKey.PH_POS_ACT004].includes(taskDefKey) || isPOSHistory;

  const isNotEditable = !lodash.includes(
    [TaskDefKey.PH_POS_ACT003, TaskDefKey.PH_POS_ACT006],
    taskDefKey
  );
  const posDecisionValue = formUtils.queryValue(decision);

  return (
    isShow && (
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
          formName="decision"
          dicts={PosDecesionList}
          disabled={taskNotEditable || isNotEditable}
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
            posDecisionValue === PosDecesionType.Accepted || taskNotEditable || isNotEditable
          }
          required={posDecisionValue === PosDecesionType.Declined}
        />
      </FormSection>
    )
  );
};

export default connect(({ GeneralPOSPHNotCFTController, claimEditable, processTask }: any) => ({
  approvalPosDecision:
    GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionTypes?.[0] || {},
  approvalPosDecisionEmpty:
    lodash.isNil(
      GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionType?.[0]?.decision
    ) &&
    !GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionType?.[0]
      ?.declineReason,
  taskNotEditable: claimEditable.taskNotEditable,
  taskDefKey: processTask?.getTask?.taskDefKey,

  isPOSHistory: GeneralPOSPHNotCFTController.isPOSHistory,
  inforcePosDecisionEmpty: true,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: 'GeneralPOSPHNotCFTController/saveFormData',
          target: 'updatePosApproval',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { approvalPosDecision }: any = props;
      return formUtils.mapObjectToFields(approvalPosDecision);
    },
  })(PosApproval)
);
