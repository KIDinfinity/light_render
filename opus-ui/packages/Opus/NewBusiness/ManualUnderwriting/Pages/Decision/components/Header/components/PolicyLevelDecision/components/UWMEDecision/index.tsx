import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'packages/Opus/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/UWDecision/index';

const PolicySection = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} showOnly section="UWDecision">
      <Fields.Decisionlaowcode />
      <Fields.Decisionuwcode />
      <Fields.Decisionaggregatedcode />
      <Fields.Mibdecisioncode />
    </Section>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => {
  const clientID = modelnamepsace.processData?.clientInfoList?.[0];
  const mibDecisionCode =
    modelnamepsace.entities?.clientMap?.[clientID]?.clientDecision?.mibDecisionCode;
  return {
    validating: formCommonController.validating,
    policyDecision: modelnamepsace.processData?.policyDecision,
    mibDecisionCode,
  };
})(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setPolicySection',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setPolicySection',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { policyDecision, mibDecisionCode } = props;
      return formUtils.mapObjectToFields({ ...policyDecision, mibDecisionCode });
    },
  })(PolicySection)
);
