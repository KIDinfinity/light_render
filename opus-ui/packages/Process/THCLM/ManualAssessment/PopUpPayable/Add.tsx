import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils, FormAntCard } from 'basic/components/Form';
import Section, { BasicFields as Fields } from './Section';
import styles from './index.less';

const BenefitItemItem = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <div className={styles.addWrap}>
      <FormAntCard>
        <Section form={form} editable={editable} section="PopUpPayable.Basic">
          <Fields.BenefitItemCode />
        </Section>
      </FormAntCard>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  basic: modelnamepsace.popUpPayable?.basic || {},
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/popUpPableAddBenefitItem`,
          payload: {
            benefitItemCode: formUtils.queryValue(changedFields.benefitItemCode),
          },
        });

        dispatch({
          type: `${NAMESPACE}/getPopPayableExchangeRate`,
        });
      }
    },
    mapPropsToFields(props: any) {
      const { basic } = props;
      return formUtils.mapObjectToFields(basic);
    },
  })(BenefitItemItem)
);
