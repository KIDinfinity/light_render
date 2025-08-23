import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import Section, { BenefitItemFields } from '../Section';
import { NAMESPACE } from '../../activity.config';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';

const Basic = ({ form, basicItem }: any) => {
  const dispatch = useDispatch();

  const taskNotEditable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const editable = basicItem?.benefitCategory !== eBenefitCategory.Reimbursement && taskNotEditable;

  const register = basicItem?.benefitCategory !== eBenefitCategory.Reimbursement;

  const handleRecover = (fieldName: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        groupBy: basicItem?.groupBy,
        benefitCategory: basicItem?.benefitCategory,
        fieldName,
      },
    });
  };

  return (
    <div className={styles.basicItem}>
      <Section
        form={form}
        editable={editable}
        section="SummaryPayable.benefitItem"
        register={register}
      >
        <BenefitItemFields.BenefitItemCode />
        <BenefitItemFields.PayableAmount OnRecover={() => handleRecover('payableAmount')} />
        <BenefitItemFields.PayableDays OnRecover={() => handleRecover('payableDays')} />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, basicItem } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'benefitItemGroupUpdate',
          payload: {
            changedFields,
            groupBy: basicItem?.groupBy,
            benefitCategory: basicItem?.benefitCategory,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { basicItem } = props;
      return formUtils.mapObjectToFields({
        ...basicItem,
      });
    },
  })(Basic)
);
