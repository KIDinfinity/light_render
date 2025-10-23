import React, { useEffect } from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import { NAMESPACE } from '../activity.config';
import Section, { FieldsAdd } from './Section';

const Add = ({ form, serviceItemId, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <div style={{ padding: '8px 4px 4px 4px' }}>
      <Section form={form} editable={editable} section="FeeItem.Add">
        <FieldsAdd.FeeItemAdd serviceItemId={serviceItemId} incidentId={incidentId} />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, serviceItemId } = props;

      dispatch({
        type: `${NAMESPACE}/addFeeItem`,
        payload: {
          serviceItemId,
          changedValues,
        },
      });
    },
  })(Add)
);
