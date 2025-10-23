import React, { Component } from 'react';
import FormSection, { FormItemInput, FormLayout } from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import { Form } from 'antd';
import TaskIDLink from '@/components/Claim/TaskIDLink';
import InfoItem from '../components/InfoItem/index';
import styles from '../index.less';

class BusinessInfo extends Component<any> {
  render() {
    const { form, businessInfo } = this.props;
    return (
      <FormSection
        form={form}
        formId="BusinessCaseInformation"
        title="BusinessCaseInformation"
        layConf={24}
        formatType="Label_COM_Exception"
      >
        <FormLayout
          layConf={{
            default: 4,
          }}
        >
          <FormItemInput
            form={form}
            disabled
            formName="bizCaseCategory"
            labelId="CaseCategory"
            labelTypeCode="Label_BPM_CaseInfo"
            className={styles.info}
          />
          <FormItemInput
            form={form}
            disabled
            formName="bizCaseNo"
            labelId="CaseNo"
            labelTypeCode="Label_BPM_CaseInfo"
            className={styles.info}
          />
          <FormItemInput
            form={form}
            disabled
            formName="businessNo"
            labelId="BusinessNo"
            labelTypeCode="Label_COM_General"
            className={styles.info}
          />
          <FormItemInput
            form={form}
            disabled
            formName="bizActivity"
            labelId="Activity"
            labelTypeCode="Label_BPM_CaseInfo"
            className={styles.info}
          />
          <InfoItem
            value={businessInfo?.bizTaskId}
            render={(value: any) => <TaskIDLink value={value} />}
          />
          <FormItemInput
            form={form}
            disabled
            formName="bizAssignee"
            labelId="Assignee"
            labelTypeCode="Label_COM_General"
            className={styles.info}
          />
          <FormItemInput
            form={form}
            disabled
            formName="policyNo"
            labelId="PolicyNo"
            labelTypeCode="Label_BIZ_Policy"
            className={styles.info}
          />
        </FormLayout>
      </FormSection>
    );
  }
}

export default connect(({ exceptionalHandlingController }: any) => ({
  businessInfo: exceptionalHandlingController?.claimProcessData?.businessInfo,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { businessInfo }: any = props;
      return formUtils.mapObjectToFields(businessInfo);
    },
  })(BusinessInfo)
);
