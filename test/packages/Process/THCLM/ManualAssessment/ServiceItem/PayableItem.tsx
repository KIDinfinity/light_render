import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

import { FormBorderCard, formUtils } from 'basic/components/Form';
import { subtract } from '@/utils/precisionUtils';
import Section, { PayableFields } from './Section';
import styles from './ServiceList.less';

const ServicePayableItem = ({ form, serviceItemPayableId, invoicePayableId, item }: any) => {
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

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeServicePayableItem`,
      payload: {
        invoicePayableItemId: invoicePayableId,
        serviceItemPayableItemId: serviceItemPayableId,
      },
    });
  };

  const handleRecover = (fieldName: string, serviceItemPayableId: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory,
        serviceItemPayableId,
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
      borderColor={policyBackgrounds?.[form.getFieldValue('policyNo')]}
    >
      <Section form={form} editable={editable} section="ServicePayable">
        <PayableFields.PayableAmount
          id={serviceItemPayableId}
          coverageKey={coverageKey}
          benefitCategory={benefitCategory}
          OnRecover={() => handleRecover('payableAmount', serviceItemPayableId)}
        />
        <PayableFields.BenefitItemCode id={serviceItemPayableId} />
        <PayableFields.BillAmount />
        <PayableFields.CopayAmount />
        <PayableFields.UncoverAmount />
        <PayableFields.DeductibleAmount
          OnRecover={() => handleRecover('deductibleNetExpense', serviceItemPayableId)}
        />
        <PayableFields.PayableDays
          OnRecover={() => handleRecover('payableDays', serviceItemPayableId)}
        />
        <PayableFields.Remark />
        <PayableFields.PolicyYear />
        <PayableFields.PolicyNo />
        <PayableFields.BenefitTypeCode />
        <PayableFields.IncurredAge />
        <PayableFields.DeductibleOtherInsurerDeduction
          onRecover={() => handleRecover('deductibleOtherInsurerDeduction', serviceItemPayableId)}
        />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { serviceItemPayableId }: any) => ({
    item: modelnamepsace.claimEntities?.serviceItemPayableListMap?.[serviceItemPayableId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, serviceItemPayableId, validating, hasBooster, booster } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveServicePayableItem',
              payload: {
                changedFields,
                serviceItemPayableId,
                hasBooster,
                boosterId: booster?.id,
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
              hasBooster,
              boosterId: booster?.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields({
        ...item,
        uncoverAmount:
          item?.benefitCategory === eBenefitCategory.Reimbursement
            ? subtract(
                formUtils.queryValue(item?.calculationAmount),
                formUtils.queryValue(item?.payableAmount)
              )
            : 0,
      });
    },
  })(ServicePayableItem)
);
