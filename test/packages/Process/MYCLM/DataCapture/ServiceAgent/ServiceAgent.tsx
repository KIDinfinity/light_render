import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../activity.config';
import { formUtils, FormAntCard } from 'basic/components/Form';
import Section, { Fields } from './Section/index';
import styles from './ServiceAgent.less';

const ServiceAgent = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  // const [reloading, setReloading] = useState(false);

  return (
    <div className={styles.policyAgent}>
      <FormAntCard
        title={
          <>
            {formatMessageApi({
              Label_BIZ_Claim: 'ServiceAgentInformation',
            })}
          </>
        }
      >
        <Section form={form} editable={editable} section="ServiceAgent">
          <Fields.AgentLocation />
          <Fields.GivenName />
          <Fields.Surname />
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
      return formUtils.mapObjectToFields({ ...policyAgent });
    },
  })(ServiceAgent)
);
