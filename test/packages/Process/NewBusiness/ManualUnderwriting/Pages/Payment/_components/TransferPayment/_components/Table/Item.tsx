import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import TransferPaymentStatus from 'process/NB/ManualUnderwriting/Enum/TransferPaymentStatus';
import Section, { Fields, localConfig } from '../../Sections/Table';

const Transferpaymenttable = ({ form, id, item }: any) => {
  const editable = ![TransferPaymentStatus.Success, TransferPaymentStatus.Cancel].includes(
    item?.status
  );
  return (
    <Section
      form={form}
      editable={editable}
      section="TransferPayment-Table"
      localConfig={localConfig}
    >
      <Fields.TargetPolicyId />

      <Fields.Amount id={id} />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, id } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'updateTransferPaymentItem',
          payload: {
            changedFields,
            id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Transferpaymenttable)
);
