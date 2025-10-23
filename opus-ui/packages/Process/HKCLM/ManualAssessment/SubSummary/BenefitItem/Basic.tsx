import React from 'react';
import { NAMESPACE } from '../../activity.config';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import Section, { BenefitItemFields } from '../Section';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';

const Basic = ({ basicItem, form }: any) => {
  const dispatch = useDispatch();

  const taskNotEditable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const editable = basicItem?.benefitCategory !== eBenefitCategory.Reimbursement && taskNotEditable;

  const register = basicItem?.benefitCategory !== eBenefitCategory.Reimbursement;

  const handleRecover = (fieldName: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory: basicItem?.benefitCategory,
        payableId: basicItem?.id,
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
        name="benefitItem"
      >
        <BenefitItemFields.BenefitItemCode />
        <BenefitItemFields.PayableAmount OnRecover={() => handleRecover('payableAmount')} />
        <BenefitItemFields.PayableDays OnRecover={() => handleRecover('payableDays')} />
      </Section>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {},
    mapPropsToFields(props: any) {
      const { basicItem } = props;
      return formUtils.mapObjectToFields({
        ...basicItem,
      });
    },
  })(Basic)
);
