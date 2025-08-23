import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

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
          <Fields.AgentNumber />
          <Fields.AgentPhone />
          <Fields.AgentStatus />
          <Fields.AgentUnit />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  policyAgent: modelnamepsace.claimProcessData?.policyAgent,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePolicyAgentInfo',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { policyAgent } = props;
      const givenName = lodash.get(policyAgent, 'givenName') || '';
      const surname = lodash.get(policyAgent, 'surname') || '';
      const agentName = `${surname} ${givenName}`;
      return formUtils.mapObjectToFields(
        { ...policyAgent, agentName },
        {
          agentNumber: (value: string | object) => value,
          agentName: (value: string | object) => value,
          agentUnit: (value: string | object) => value,
          agentPhone: (value: string | object) => value,
          agentLocation: (value: string | object) => value,
          agentStatus: (value: string | object) => value,
        }
      );
    },
  })(ServiceAgent)
);
