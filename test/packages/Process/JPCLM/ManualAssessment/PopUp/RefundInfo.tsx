import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import Section, { RefundInfo as Fields } from './Section';
import styles from './index.less';

const RefundInfo = ({ form, incidentId, id, policyId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  return (
    <div className={styles.klip}>
      <Section form={form} editable={editable} section="PremiumWaiverClaimInfo">
        <Fields.PayoutAmount incidentId={incidentId} id={id} policyId={policyId} />
        <Fields.EntryAmount />
        <Fields.PrePaidPremium />
        <Fields.UnpaidPremium />
        <Fields.InterestAmount />
        <Fields.MaterialFee />
      </Section>
    </div>
  );
};

export default Form.create<any>({
  mapPropsToFields(props: any) {
    const { item } = props;
    return formUtils.mapObjectToFields(item);
  },
})(RefundInfo);
