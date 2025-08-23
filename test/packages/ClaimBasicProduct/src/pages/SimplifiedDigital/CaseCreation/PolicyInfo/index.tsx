import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const Index = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.policyInfo}>
      <div className={styles.icon} />
      <div className={styles.box}>
        <div className={styles.header}>
          <div className={styles.title}>{formatMessageApi({ Label_COM_General: 'PolicyNo' })}</div>
          <Section form={form} editable={editable} section="PolicyInfo">
            <Fields.PolicyNo />
          </Section>
        </div>
        <Section form={form} editable={editable} section="PolicyInfo">
          <Fields.BasePlan />
          <Fields.RiskStatus />
          <Fields.PremiumStatus />
          <Fields.IssueEffectiveDate />
          <Fields.AgentCode />
          <Fields.AgentName />
          <Fields.AgencyName />
          <Fields.AgencyMobileNo />
          <Fields.AgentBranch />
        </Section>
      </div>
    </div>
  );
};

export default connect(({ formCommonController, simplifiedDigitalController }: any) => ({
  policyInfo: simplifiedDigitalController?.processData?.policyInfo,
  businessType: simplifiedDigitalController?.processData?.businessType,
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'simplifiedDigitalController/saveEntry',
              target: 'savePolicyInfo',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'simplifiedDigitalController/saveFormData',
            target: 'savePolicyInfo',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { businessType, policyInfo } = props;
      return formUtils.mapObjectToFields({ ...policyInfo, businessType });
    },
  })(Index)
);
