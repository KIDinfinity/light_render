import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import Section, { BasicFields as Fields } from './Section';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { formUtils } from 'basic/components/Form';

import styles from './index.less';

const Basic = ({ form, item = {}, incidentId }: any) => {
  const { policyNo } = item;
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.basicItem}>
      <Section form={form} editable={editable} section="Payable_ClaimPayable">
        <Fields.MainProductCode />
        <Fields.SettlementDecision policyNo={policyNo} incidentId={incidentId} />
        <Fields.PayableAmount />
        <Fields.ChangeObjectAmount />
        <Fields.DetailedAssessmentDecision policyNo={policyNo} incidentId={incidentId} />
        <Fields.RefundAmount />
      </Section>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        item: { id, policyNo },
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveClaimPayableItem',
          payload: {
            changedFields,
            incidentPayableId: id,
            policyNo: policyNo,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields({
        ...item,
        payableAmount:
          formUtils.queryValue(item.payableAmount) +
          ((item.refundAmount ? formUtils.queryValue(item.refundAmount) : 0) || 0) +
          ((item.discountAmount ? formUtils.queryValue(item.discountAmount) : 0) || 0),
      });
    },
  })(Basic)
);
