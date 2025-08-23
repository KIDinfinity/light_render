import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import Section, { BenefitTypeBoosterFields } from '../Section';
import { formUtils } from 'basic/components/Form';

import styles from './index.less';

const Booster = ({ form, boosterItem, isPayableEditable }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && isPayableEditable;

  return (
    <div className={styles.boosterItem}>
      <Section form={form} editable={editable} section="SummaryPayable.booster">
        <BenefitTypeBoosterFields.PayableAmount
          originAmount={boosterItem?.systemCalculationAmount}
        />
        <BenefitTypeBoosterFields.PayableDays originDays={boosterItem?.systemPayableDays} />
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
      const { boosterItem } = props;

      return formUtils.mapObjectToFields({ ...boosterItem, item: boosterItem });
    },
  })(Booster)
);
