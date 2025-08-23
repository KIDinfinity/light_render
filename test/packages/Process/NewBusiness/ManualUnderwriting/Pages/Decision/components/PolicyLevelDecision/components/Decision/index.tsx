import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/UWDecision/index';

const PolicySection = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="UWDecision">
      <Fields.PolicyLevelDecision />
      <Fields.Reason />
      <Fields.UWDecisionDescription />
      <Fields.PostponeShortName />
      <Fields.PostponeLongDescription />
      <Fields.UWMEReason />
      <Fields.Postponeperiod />
      <Fields.Postponeperiodunit />
      <Fields.PostponeRemark />
      <Fields.Mibdecisioncode />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => {
  const clientID = modelnamepsace.processData?.clientInfoList?.[0];
  const mibDecisionCode =
    modelnamepsace.entities?.clientMap?.[clientID]?.clientDecision?.mibDecisionCode;
  return {
    policyDecision: modelnamepsace.processData?.policyDecision,
    mibDecisionCode,
  };
})(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'setPolicySection',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { policyDecision, mibDecisionCode } = props;
      return formUtils.mapObjectToFields({ ...policyDecision, mibDecisionCode });
    },
  })(PolicySection)
);
