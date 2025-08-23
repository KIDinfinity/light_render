import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import classNames from 'classnames';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { subtract } from '@/utils/precisionUtils';

import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import Section, { BenefitItemFields } from './Section';
import styles from './index.less';

const BenefitItem = ({ form, benefitItemData }: any) => {
  const taskNotEditable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const editable =
    benefitItemData?.benefitCategory !== eBenefitCategory.Reimbursement && taskNotEditable;
  const dispatch = useDispatch();

  const register = benefitItemData?.benefitCategory !== eBenefitCategory.Reimbursement;

  const handleRecover = (fieldName: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        groupBy: benefitItemData?.groupBy,
        benefitCategory: benefitItemData?.benefitCategory,
        fieldName,
      },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/benefitItemGroupDelete`,
      payload: {
        groupBy: benefitItemData?.groupBy,
        benefitCategory: benefitItemData?.benefitCategory,
        boosterDate: benefitItemData?.boosterDate,
      },
    });
  };

  const isAdjustMent = benefitItemData?.isAdjustment === IsAdjustment.Yes;

  return (
    <FormBorderCard
      type="weight"
      className={classNames(isAdjustMent && styles.isAdjustment, styles.benefitItem)}
      button={{ visiable: taskNotEditable, callback: handleDelete }}
    >
      <Section
        form={form}
        editable={editable}
        section="SummaryPayable.benefitItem"
        register={register}
      >
        <BenefitItemFields.BenefitItemCode />
        <BenefitItemFields.PayableAmount OnRecover={() => handleRecover('payableAmount')} />
        <BenefitItemFields.PayableDays OnRecover={() => handleRecover('payableDays')} />
        <BenefitItemFields.BooterAmount originAmount={benefitItemData?.boosterCalculationAmount} />
        <BenefitItemFields.BooterDays originDays={benefitItemData?.boosterSystemPayableDays} />
        <BenefitItemFields.BillAmount />
        <BenefitItemFields.CopayAmount />
        <BenefitItemFields.UncoverAmount />
      </Section>
    </FormBorderCard>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, benefitItemData } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'benefitItemGroupUpdate',
          payload: {
            changedFields,
            groupBy: benefitItemData?.groupBy,
            benefitCategory: benefitItemData?.benefitCategory,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { benefitItemData } = props;
      return formUtils.mapObjectToFields({
        ...benefitItemData,
        uncoverAmount: subtract(
          formUtils.queryValue(benefitItemData?.calculationAmount),
          formUtils.queryValue(benefitItemData?.payableAmount)
        ),
      });
    },
  })(BenefitItem)
);
