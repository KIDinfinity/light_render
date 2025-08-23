import React from 'react';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Therapies, { FieldsPayable as Fields } from 'process/Components/BussinessControls/Therapies';

const ServicePayableItem = ({ NAMESPACE, form, procedurePayableId, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const payableId = item?.payableId;
  const benefitCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.benefitCategory
  );
  const coverageKey = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.coverageKey
  );

  const handleRecover = (fieldName: string, id: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory,
        payableId: id,
        fieldName,
      },
    });
  };

  return (
    <Therapies.Section form={form} editable={editable} section="Service" NAMESPACE={NAMESPACE}>
      <Fields.PayableAmount
        id={procedurePayableId}
        coverageKey={coverageKey}
        benefitCategory={benefitCategory}
        OnRecover={() => handleRecover('payableAmount', procedurePayableId)}
      />
      <Fields.BenefitItemCode />

      <Fields.DeductibleAmount />
      <Fields.PayableDays OnRecover={() => handleRecover('payableDays', procedurePayableId)} />

      <Fields.ExchangeRateInvoicePolicy />

      <Fields.Remark />
    </Therapies.Section>
  );
};

export default connect((state: any) => ({
  validating: state?.formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { NAMESPACE, dispatch, procedurePayableId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveProcedurePayableItem',
              payload: {
                changedFields,
                procedurePayableId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveProcedurePayableItem',
            payload: {
              changedFields,
              procedurePayableId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item, booster } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(ServicePayableItem)
);
