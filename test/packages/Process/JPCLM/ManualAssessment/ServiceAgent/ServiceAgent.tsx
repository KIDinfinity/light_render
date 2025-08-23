import React, { useState } from 'react';
import { Form, Icon } from 'antd';
import { connect, useSelector } from 'dva';
import { FormAntCard, formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import Section, { SectionTitle, Fields } from './Section';
import styles from './ServiceAgent.less';

const ServiceAgent = ({ form, dispatch }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const [reloading, setReloading] = useState(false);

  return (
    <div className={styles.policyAgent}>
      <FormAntCard
        title={
          <>
            <SectionTitle />
            {editable && (
              <div
                className={styles.icon}
                onClick={async () => {
                  if (reloading) return;
                  setReloading(true);
                  await dispatch({
                    type: 'JPCLMOfClaimAssessment/getPolicyAgent',
                  });
                  setReloading(false);
                }}
              >
                <Icon type="sync" spin={reloading} />
              </div>
            )}
          </>
        }
      >
        <Section form={form} editable={editable} section="ServiceAgent">
          <Fields.AgencyAcceptanceDate />
          <Fields.AgencyCode />
          <Fields.AgencyName />
          <Fields.AgencyPhoneNo />
          <Fields.AgentName />
          <Fields.AgentNumber />
          <Fields.AgentStatus />
          <Fields.BranchCode />
          <Fields.BranchName />
          <Fields.InformAgency />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ formCommonController, JPCLMOfClaimAssessment }: any) => ({
  validating: formCommonController.validating,
  informTheAgency: JPCLMOfClaimAssessment.claimProcessData?.informTheAgency,
  policyAgent: JPCLMOfClaimAssessment.claimProcessData?.policyAgent,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'savePolicyAgentInfo',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'savePolicyAgentInfo',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { policyAgent, informTheAgency } = props;
      const policyAgentInfo = { ...policyAgent, informTheAgency };
      return formUtils.mapObjectToFields(
        lodash.startsWith(policyAgent?.agentNumber, 'DL')
          ? { ...policyAgentInfo, agentNumber: '' }
          : policyAgentInfo
      );
    },
  })(ServiceAgent)
);
