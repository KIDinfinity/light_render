import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { ReactComponent as fileSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitleFile.svg';
import Section, { Fields } from './Section';
import styles from './ServiceAgent.less';

const ServiceAgent = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.policyAgent}>
      <div className={styles.titleRow}>
        <Icon component={fileSvg} />
        {formatMessageApi({ Label_BIZ_Claim: 'ServiceAgentInformation' })}
      </div>
      <div className={styles.innerCard}>
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
      </div>
    </div>
  );
};

export default connect(({ formCommonController, opusNonOpusClaimManagement }: any) => ({
  validating: formCommonController.validating,
  informTheAgency: opusNonOpusClaimManagement.businessData?.informTheAgency,
  policyAgent: opusNonOpusClaimManagement.businessData?.policyAgent,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'opusNonOpusClaimManagement/saveEntry',
              target: 'savePolicyAgentInfo',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'opusNonOpusClaimManagement/saveFormData',
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
