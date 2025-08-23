import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { SERVICEITEM } from '@/utils/claimConstant';
import {v4 as uuidv4 } from 'uuid';
import { FormBorderCard } from 'basic/components/Form';
import { Form } from 'antd';
import Section, { Fields } from './Section';

const Add = ({ invoiceId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <FormBorderCard marginBottom type="weight" backgroundColorName={'card4BgColor'}>
      <Section form={form} editable={editable} section="ServiceItem" register={false}>
        <Fields.ServiceItem invoiceId={invoiceId} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  claimNo: modelnamepsace.claimProcessData?.claimNo,
}))(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, claimNo, invoiceId } = props;
      const addServiceItem = {
        ...SERVICEITEM,
        claimNo,
        id: uuidv4(),
        invoiceId,
        ...changedValues,
      };

      dispatch({
        type: `${NAMESPACE}/addServiceItem`,
        payload: {
          invoiceId,
          addServiceItem,
        },
      });
    },
  })(Add)
);
