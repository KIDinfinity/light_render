import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Form, Icon } from 'antd';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './ServiceAgent.less';

import Section, { Fields } from './Section';

const ServiceAgent = ({ form, dispatch }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const [reloading, setReloading] = useState(false);

  return (
    <div className={styles.policyAgent}>
      <FormAntCard
        title={
          <>
            {formatMessageApi({
              Label_BIZ_Claim: 'ServiceAgentInformation',
            })}
            <div
              className={styles.icon}
              onClick={async () => {
                if (reloading) return;
                setReloading(true);
                await dispatch({
                  type: 'JPCLMOfDataCapture/getPolicyAgent',
                });
                setReloading(false);
              }}
            >
              <Icon type="sync" spin={reloading} />
            </div>
          </>
        }
      >
        <Section form={form} editable={editable}>
          <Fields.AgentStatus />
          <Fields.AgencyCode />
          <Fields.AgencyName />
          <Fields.AgencyPhoneNo />
          <Fields.AgentName />
          <Fields.AgentNumber />
          <Fields.BranchCode />
          <Fields.BranchName />
          <Fields.AgencyAcceptanceDate />
          <Fields.InformAgency />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ formCommonController, JPCLMOfDataCapture }: any) => ({
  validating: formCommonController.validating,
  policyAgent: JPCLMOfDataCapture.claimProcessData?.policyAgent,
  informTheAgency: JPCLMOfDataCapture.claimProcessData?.informTheAgency,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'serviceAgentUpdate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'serviceAgentUpdate',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { policyAgent, informTheAgency } = props;

      return formUtils.mapObjectToFields({ ...policyAgent, informTheAgency });
    },
  })(ServiceAgent)
);
