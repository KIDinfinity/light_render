import React from 'react';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import getPolicyYearValue from 'process/PHCLM/ManualAssessment/_models/functions/getPolicyYearValue';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import Section, { PayableFields as Fields } from './Section';

const ServicePayableItem = ({ form, otherProcedurePayableId, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );
  const payableId = item?.payableId;
  const benefitCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.benefitCategory
  );
  const coverageKey = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.coverageKey
  );

  const claimPayableListItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]
  );

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeOtherProcedurePayableItem`,
      payload: {
        id: otherProcedurePayableId,
        treatmentPayableId: item?.treatmentPayableId,
      },
    });
  };

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
    <FormBorderCard
      button={{ visiable: editable, callback: handleDelete }}
      type="weight"
      borderColor={
        policyBackgrounds?.[
          `${form.getFieldValue('policyNo')}${getPolicyYearValue(claimPayableListItem)}`
        ]
      }
    >
      <Section form={form} editable={editable} section="OtherProcedurePayable">
        <Fields.PayableAmount
          id={otherProcedurePayableId}
          coverageKey={coverageKey}
          benefitCategory={benefitCategory}
          OnRecover={() => handleRecover('payableAmount', otherProcedurePayableId)}
        />
        <Fields.BenefitItemCode />
        <Fields.Remark />
        <Fields.PolicyYear />
        <Fields.PolicyNo />
        <Fields.PayableDays />
        <Fields.BenefitTypeCode />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, otherProcedurePayableId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveOtherProcedurePayableItem',
              payload: {
                changedFields,
                otherProcedurePayableId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveOtherProcedurePayableItem',
            payload: {
              changedFields,
              otherProcedurePayableId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(ServicePayableItem)
);
