import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import Section, { Fields } from './Section';

const Main = ({ form }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PendingDocument">
      <Fields.HostClaimNo />
      <Fields.OpusBusinessNo />
      <Fields.PolicyNo />
      <Fields.InsuredName />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'claimProcessDataUpdate',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item = {} } = props;

      return formUtils.mapObjectToFields({
        ...item,
        insuredName: `${item?.insured?.firstName || ''} ${item?.insured?.surname || ''}`,
      });
    },
  })(Main)
);
