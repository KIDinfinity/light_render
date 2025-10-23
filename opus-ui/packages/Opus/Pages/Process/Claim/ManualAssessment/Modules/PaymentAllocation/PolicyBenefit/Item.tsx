import React from 'react';
import { Form } from 'antd';
import { useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';

import Section, { PolicyBenefitFields } from '../Section';
import styles from './index.less';

const PolicyBenefit = ({ form, item }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.klip}>
      <Section
        form={form}
        editable={editable}
        section="paymentAllocation.policyBenefit"
        formId={`paymentAllocation-${item?.id}`}
      >
        <PolicyBenefitFields.PolicyNo />
        <PolicyBenefitFields.PayoutAmount />
        <PolicyBenefitFields.PolicyHolder />
        {/* <PolicyBenefitFields.PolicyInsured /> */}
      </Section>
    </div>
  );
};

export default Form.create<any>({
  mapPropsToFields(props: any) {
    const { item } = props;
    return formUtils.mapObjectToFields(item);
  },
})(PolicyBenefit);
