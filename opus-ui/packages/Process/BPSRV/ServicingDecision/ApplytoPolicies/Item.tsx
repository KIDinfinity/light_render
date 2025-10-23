import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const Item = (props: any) => {
  const { form, transactionId, tableCollect, id } = props;

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="ApplytoPolicies" tableCollect={tableCollect}>
      <Fields.BillingFrequency />
      <Fields.Decision cloneListId={id} transactionId={transactionId} />
      <Fields.InsuredFullName />
      <Fields.PaidToDate />
      <Fields.PaymentMethod />
      <Fields.PolicyId />
      <Fields.PolicyName />
      <Fields.PolicySelection />
      <Fields.PremiumStatus />
      <Fields.RiskStatus />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId, id }: any) => ({
    validating: formCommonController.validating,
    applyToPolicy: modelnamepsace.entities?.policyInfoBOListMap?.[id],
    applyToPolicyBOList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.applyToPolicyBOList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id: cloneListId, transactionId }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'applytoPoliciesUpdate',
              payload: {
                changedFields,
                cloneListId,
                transactionId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'applytoPoliciesUpdate',
            payload: {
              changedFields,
              cloneListId,
              transactionId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { applyToPolicy, applyToPolicyBOList, id } = props;

      const isSelect = applyToPolicyBOList?.includes(id);

      return formUtils.mapObjectToFields({
        ...applyToPolicy,
        policySelection: isSelect ? 1 : 0,
        policyDecision: applyToPolicy.policyDecision || '',
      });
    },
  })(Item)
);
