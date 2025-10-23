import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import classNames from 'classnames';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import Section, { PayableFields as Fields } from './Section';
import { subtract } from '@/utils/precisionUtils';
import styles from './index.less';

const Payable = ({ form, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );
  const register = item?.benefitCategory !== eBenefitCategory.Reimbursement;

  const handleRecover = (fieldName: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory: item?.benefitCategory,
        payableId: item?.id,
        fieldName,
      },
    });
  };

  const claimPayableListItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap[item?.payableId]
  );

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;
  return (
    <FormBorderCard
      borderColor={policyBackgrounds?.[item?.policyNo]}
      type="weight"
      className={classNames(isAdjustMent && styles.isAdjustment, styles.benefitItem)}
    >
      <Section
        form={form}
        editable={editable}
        section="PopUpEditPayable.Payable"
        register={register}
        name="benefitItem"
      >
        <Fields.BenefitItemCode />
        <Fields.PayableAmount OnRecover={() => handleRecover('payableAmount')} />
        <Fields.PayableDays OnRecover={() => handleRecover('payableDays')} />
        <Fields.BooterAmount originAmount={item?.boosterCalculationAmount} />
        <Fields.BooterDays originDays={item?.boosterSystemPayableDays} />
        <Fields.BillAmount />
        <Fields.CopayAmount />
        <Fields.UncoverAmount />
        <Fields.DeductibleAmount
          onRecover={() => handleRecover('deductibleNetExpense')}
          id={item?.id}
          coverageKey={claimPayableListItem?.coverageKey}
        />
        <Fields.DeductibleOtherInsurerDeduction
          onRecover={() => handleRecover('deductibleOtherInsurerDeduction')}
        />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    async onFieldsChange(props: any, changedFields: any) {
      const { dispatch, benefitCategory, item, booster, policyBooster } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (benefitCategory === eBenefitCategory.Reimbursement) {
          await dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveServicePayableItem',
            payload: {
              changedFields,
              serviceItemPayableId: item?.id,
              hasBooster: policyBooster,
              boosterId: booster?.id,
            },
          });
        } else {
          await dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: `saveSummaryTreatmentPayable`,
            payload: {
              changedFields,
              id: item.id,
              benefitCategory,
            },
          });
        }
        await dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePopUpEditItemUpdate',
          payload: {
            changedFields,
            id: item?.id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item, benefitCategory } = props;
      return formUtils.mapObjectToFields({
        ...item,
        benefitCategory,
        uncoverAmount:
          item?.benefitCategory === eBenefitCategory.Reimbursement
            ? subtract(
                formUtils.queryValue(item?.calculationAmount),
                formUtils.queryValue(item?.payableAmount)
              )
            : 0,
      });
    },
  })(Payable)
);
