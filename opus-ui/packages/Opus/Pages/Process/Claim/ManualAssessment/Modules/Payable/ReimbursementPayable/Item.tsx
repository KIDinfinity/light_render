import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import Section, { PayableFields as Fields } from './Section';

const TreatmentPayableListItem = ({ dispatch, form, item: { id, invoicePayableId } }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  return (
    <CardOfClaim
      showButton={!!editable}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
      handleClick={() => {
        dispatch({
          type: `${NAMESPACE}/removeServicePayableItem`,
          payload: {
            serviceItemPayableItemId: id,
            invoicePayableItemId: invoicePayableId,
          },
        });
      }}
    >
      <Section form={form} editable={editable} section="Payable.TreatmentPayable">
        <Fields.BenefitItemCode />
        <Fields.PayableAmount />
        <Fields.PayableDays />
        <Fields.BenefitMultiple />
        <Fields.Remark />
        <Fields.BenefitTypeCode />
      </Section>
    </CardOfClaim>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const {
        dispatch,
        item: { id: serviceItemPayableId },
        validating,
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveServicePayableItem',
              payload: {
                changedFields,
                serviceItemPayableId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveServicePayableItem',
            payload: {
              changedFields,
              serviceItemPayableId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(TreatmentPayableListItem)
);
