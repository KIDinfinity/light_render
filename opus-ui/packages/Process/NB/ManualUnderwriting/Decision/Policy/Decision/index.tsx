import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Section, { Fields } from './Section';

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

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  policyDecision: lodash.get(modelnamepsace.businessData, 'policyList[0].policyDecision'),
  mibDecisionCode: lodash.get(
    modelnamepsace.businessData,
    'policyList[0].clientInfoList[0].clientDecision.mibDecisionCode',
    ''
  ),
}))(
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
