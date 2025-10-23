import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { TotalPayableFields as Fields } from '../../Section';
import styles from './index.less';

const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.Item}>
      <Section form={form} editable={editable} section="Treatment.TotalPayable">
        <Fields.OutpatientDate />
        <Fields.adjustOriginPayableDays />
        <Fields.AdjustOriginPayableAmount />

        {/* <Fields.PayableDays />
        <Fields.PayableAmount /> */}
      </Section>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { totalItem }: any = props;
      return formUtils.mapObjectToFields(totalItem);
    },
  })(Item)
);
