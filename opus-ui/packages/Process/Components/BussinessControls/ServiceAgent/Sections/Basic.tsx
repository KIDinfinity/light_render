import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import ServiceAgent, {
  FieldsBasic as Fields,
} from 'process/Components/BussinessControls/ServiceAgent';

const ServiceAgentSection = ({ form, NAMESPACE, policyAgent }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <ServiceAgent.Section
      form={form}
      editable={editable}
      section="ServiceAgent"
      NAMESPACE={NAMESPACE}
      id={policyAgent?.id}
    >
      <Fields.AgentLocation />
      <Fields.AgentName />
      <Fields.GivenName />
      <Fields.Surname />
      <Fields.AgentNumber />
      <Fields.AgentPhone />
      <Fields.AgentStatus />
      <Fields.AgentUnit />
    </ServiceAgent.Section>
  );
};

export default connect((state: any, { NAMESPACE }: any) => ({
  policyAgent: state?.[NAMESPACE]?.claimProcessData?.policyAgent,
  validating: state?.formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, NAMESPACE } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'savePolicyAgentInfo',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'savePolicyAgentInfo',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { policyAgent } = props;
      return formUtils.mapObjectToFields(policyAgent);
    },
  })(ServiceAgentSection)
);
