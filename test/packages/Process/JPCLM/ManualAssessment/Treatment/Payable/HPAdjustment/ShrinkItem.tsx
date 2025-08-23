import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { AdjIpShrinkFields as Fields } from '../../Section';
import styles from './index.less';

const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.Item}>
      <Section form={form} editable={editable} section="Treatment.AdjIpShrinkPayable">
        <Fields.BenefitTypeCode />
        <Fields.SystemCalculationDays />
        <Fields.SystemCalculationAmount />
        <Fields.AssessorOverrideDays />
        <Fields.AssessorOverrideAmount />
      </Section>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { treatmentPayable }: any = props;
      return formUtils.mapObjectToFields(treatmentPayable);
    },
  })(Item)
);
