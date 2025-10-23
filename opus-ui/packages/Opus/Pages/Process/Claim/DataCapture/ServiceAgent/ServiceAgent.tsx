import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Form, Icon } from 'antd';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as fileSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitleFile.svg';
import styles from './ServiceAgent.less';

import Section, { Fields } from './Section';

const ServiceAgent = ({ form, dispatch }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const [reloading, setReloading] = useState(false);

  return (
    <div className={styles.policyAgent}>
      <div className={styles.titleRow}>
        <Icon component={fileSvg} />
        {formatMessageApi({ Label_BIZ_Claim: 'ServiceAgentInformation' })}
        {/* {editable && (
          <div
            className={styles.icon}
            onClick={async (e) => {
              e?.stopPropagation();
              if (reloading) return;
              setReloading(true);
              await dispatch({
                type: `${NAMESPACE}/getPolicyAgent`,
                payload: {
                  source: formatMessageApi({ Label_BIZ_Claim: 'ServiceAgentInformation' }),
                },
              });
              setReloading(false);
            }}
          >
            <Icon type="sync" spin={reloading} />
          </div>
        )} */}
      </div>
      <div className={styles.innerCard}>
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
      </div>
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamespace }: any) => ({
  validating: formCommonController.validating,
  policyAgent: modelnamespace.claimProcessData?.policyAgent,
  informTheAgency: modelnamespace.claimProcessData?.informTheAgency,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'serviceAgentUpdate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
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
