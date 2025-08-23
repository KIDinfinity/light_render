import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import getPolicyYearValue from 'process/PHCLM/ManualAssessment/_models/functions/getPolicyYearValue';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Section, { PayableFields } from './Section';
import styles from './Payable.less';
import { VLD_000343 } from '../validators';
import handleMessageModal from '@/utils/commonMessage';
import getOriginData from '../_models/functions/adjustmentMapUtils';
import AdjustTreatmentPayable from './AdjustTreatmentPayable';

const TreatmentPayable = ({ form, item, isPayableEditable }: any) => {
  const editable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && isPayableEditable;
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const claimPayableListItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[item?.payableId]
  );

  const benefitCategory = item?.benefitCategory;

  const handleDelete = () => {
    const error = VLD_000343(item);
    if (error) {
      handleMessageModal([
        {
          content: error,
        },
      ]);
      return;
    }
    dispatch({
      type: `${NAMESPACE}/removeTreatmentPayableItem`,
      payload: {
        id: item?.id,
        benefitCategory: item?.benefitCategory,
      },
    });
  };

  const handleRecover = (fieldName: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory,
        payableId: item?.id,
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
      {item.isPayableAdjusted && <AdjustTreatmentPayable item={item} />}
      <Section form={form} editable={editable} section="TreatmentPayable">
        <PayableFields.PayableAmount
          benefitCategory={item?.benefitCategory}
          id={item?.id}
          coverageKey={item?.coverageKey}
          OnRecover={() => handleRecover('payableAmount')}
        />
        <PayableFields.BenefitItemCode />
        <PayableFields.PayableDays OnRecover={() => handleRecover('payableDays')} />
        <PayableFields.PolicyNo />
        <PayableFields.ProductCode />
        <PayableFields.BenefitTypeCode />
        <PayableFields.BenefitAmountPerDay />
        <PayableFields.Remark />
        <PayableFields.DateOfAdmission />
        <PayableFields.DateOfDischarge />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamespace }: any, { item }) => ({
  validating: formCommonController.validating,
  isPayableEditable:
    modelnamespace.claimEntities?.claimPayableListMap?.[item?.payableId]?.isNewPayable ||
    !modelnamespace.claimProcessData?.appeal,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, item, isPayableEditable } = props;
      if (!isPayableEditable) return;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveSummaryTreatmentPayable',
              payload: {
                changedFields,
                id: item?.id,
                benefitCategory: item?.benefitCategory,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveSummaryTreatmentPayable',
            payload: {
              changedFields,
              id: item?.id,
              benefitCategory: item?.benefitCategory,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      let { item } = props;
      if (item.isPayableAdjusted) {
        item = getOriginData(item);
      }
      return formUtils.mapObjectToFields({ ...item, benefitAmountPerDay: item.calculationAmount });
    },
  })(TreatmentPayable)
);
