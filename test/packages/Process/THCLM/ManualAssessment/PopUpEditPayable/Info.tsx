import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { InfoFields as Fields } from './Section';
import { subtract } from '@/utils/precisionUtils';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import styles from './index.less';

const Info = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.info}>
      <div className={styles.info}>
        <div className={styles.rightWrap}>
          <div className={styles.right}>
            <Section form={form} editable={editable} section="PopUpEditPayable.Info">
              <Fields.ClaimDecision />
              <Fields.BenefitTypeCode />
              <Fields.PayableAmount />
              <Fields.PayableDays />
              <Fields.BooterAmount />
              <Fields.BooterDays />
              <Fields.BillAmount />
              <Fields.CopayAmount />
              <Fields.UncoverAmount />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  data: modelnamepsace.PopUpEditPayable?.data,
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { data } = props;
      return formUtils.mapObjectToFields({
        ...data,
        uncoverAmount:
          data?.benefitCategory === eBenefitCategory.Reimbursement
            ? subtract(
                formUtils.queryValue(data?.calculationAmount),
                formUtils.queryValue(data?.payableAmount)
              )
            : 0,
      });
    },
  })(Info)
);
