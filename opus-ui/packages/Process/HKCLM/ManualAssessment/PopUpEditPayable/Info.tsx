import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { InfoFields as Fields } from './Section';
import styles from './index.less';

const Info = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
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
          </Section>
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
      const emptyAmount =
        data?.isStandaloneBooster === 'Y'
          ? {
              payableAmount: '',
              payableDays: '',
            }
          : {};

      return formUtils.mapObjectToFields({
        ...data,
        ...emptyAmount,
      });
    },
  })(Info)
);
