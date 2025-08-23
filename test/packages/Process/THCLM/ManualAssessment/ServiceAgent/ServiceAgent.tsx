import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils, FormAntCard } from 'basic/components/Form';
import Section, { SectionTitle, Fields } from './Section/index';
import styles from './ServiceAgent.less';

const ServiceAgent = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.policyAgent}>
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="ServiceAgent">
          <Fields.AgentLocation />
          <Fields.AgentName />
          <Fields.AgentFirstName />
          <Fields.AgentSurname />
          <Fields.AgentNumber />
          <Fields.AgentPhone />
          <Fields.AgentStatus />
          <Fields.AgentUnit />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  policyAgent: modelnamepsace.claimProcessData?.policyAgent,
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;

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

      return formUtils.mapObjectToFields(
        { ...policyAgent },
        {
          agentNumber: (value: string | object) => value,
          givenName: (value: string | object) => value,
          surname: (value: string | object) => value,
          agentUnit: (value: string | object) => value,
          agentPhone: (value: string | object) => value,
          agentLocation: (value: string | object) => value,
          agentStatus: (value: string | object) => value,
        }
      );
    },
  })(ServiceAgent)
);
