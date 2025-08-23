import React from 'react';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import getPolicyYearValue from 'process/PHCLM/ManualAssessment/_models/functions/getPolicyYearValue';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import Section, { PayableFields as Fields } from './Section';
import styles from './index.less';

const ServicePayableItem = ({ form, procedurePayableId, item }: any) => {
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
      modelnamepsace.claimEntities?.claimPayableListMap?.[procedurePayableId]
  );

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeProcedurePayableItem`,
      payload: {
        id: procedurePayableId,
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

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;

  return (
    <FormBorderCard
      button={{ visiable: editable, callback: handleDelete }}
      className={isAdjustMent && styles.isAdjustment}
      type="weight"
      borderColor={
        policyBackgrounds?.[
          `${form.getFieldValue('policyNo')}${getPolicyYearValue(claimPayableListItem)}`
        ]
      }
    >
      <Section form={form} editable={editable} section="SurgeryPayable">
        <Fields.PayableAmount
          id={procedurePayableId}
          coverageKey={coverageKey}
          benefitCategory={benefitCategory}
          OnRecover={() => handleRecover('payableAmount', procedurePayableId)}
        />
        <Fields.BenefitItemCode />
        <Fields.Remark />
        <Fields.PolicyYear />
        <Fields.PolicyNo />
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
      const { dispatch, procedurePayableId, validating } = props;

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
