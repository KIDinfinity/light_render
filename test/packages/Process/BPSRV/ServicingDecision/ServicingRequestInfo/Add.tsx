import React, { useEffect } from 'react';
import { useSelector, connect } from 'dva';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const Add = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <FormBorderCard marginBottom>
      <Section form={form} editable={editable} section="ServicingRequestInfo" register={false}>
        <Fields.TransactionTypeCode />
      </Section>
    </FormBorderCard>
  );
};

export default connect()(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch } = props;

      dispatch({
        type: `${NAMESPACE}/servicingRequestInfoAdd`,
        payload: {
          addServicingRequestInfo: {
            id: uuidv4(),
            // TODO
            isManualAdd: true,
            ...changedValues,
            // TODO
            addressChangeInfo: {
              countryCode: 'THA',
            },
          },
        },
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
