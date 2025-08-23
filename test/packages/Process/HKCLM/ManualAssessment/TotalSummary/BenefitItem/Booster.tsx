import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import Section, { BenefitItemBoosterFields } from '../Section';
import { NAMESPACE } from '../../activity.config';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';

const Booster = ({ form, boosterItem }: any) => {
  const taskNotEditable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const editable =
    boosterItem?.benefitCategory !== eBenefitCategory.Reimbursement && taskNotEditable;

  const register = boosterItem?.benefitCategory !== eBenefitCategory.Reimbursement;

  return (
    <div className={styles.boosterItem}>
      <Section
        form={form}
        editable={editable}
        section="SummaryPayable.benefitItemBooster"
        register={register}
      >
        <BenefitItemBoosterFields.PayableAmount
          originAmount={boosterItem?.systemCalculationAmount}
        />
        <BenefitItemBoosterFields.PayableDays originDays={boosterItem?.systemPayableDays} />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, boosterItem } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'benefitItemGroupUpdate',
          payload: {
            changedFields,
            groupBy: boosterItem?.groupBy,
            benefitCategory: boosterItem?.benefitCategory,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { boosterItem } = props;
      return formUtils.mapObjectToFields({
        ...boosterItem,
      });
    },
  })(Booster)
);
