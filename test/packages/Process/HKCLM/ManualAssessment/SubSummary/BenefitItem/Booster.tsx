import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import Section, { BoosterBenefitItemFields } from '../Section';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';

const Booster = ({ boosterItem, form }: any) => {
  const taskNotEditable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const editable =
    boosterItem?.benefitCategory !== eBenefitCategory.Reimbursement && taskNotEditable;

  const register = boosterItem?.benefitCategory !== eBenefitCategory.Reimbursement;

  return (
    <div className={styles.boosterItem}>
      {!lodash.isEmpty(boosterItem?.booster) && (
        <Section
          form={form}
          editable={editable}
          section="SummaryPayable.boosterBenefitItem"
          register={register}
          name="benefitItem"
        >
          <BoosterBenefitItemFields.PayableAmount />
          <BoosterBenefitItemFields.PayableDays />
        </Section>
      )}
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {},
    mapPropsToFields(props: any) {
      const { boosterItem } = props;
      console.log('boosterItem', boosterItem);

      return formUtils.mapObjectToFields({
        ...boosterItem,
      });
    },
  })(Booster)
);
