import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { Fields, localConfig } from './Section';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import TransferPaymentStatus from 'process/NB/ManualUnderwriting/Enum/TransferPaymentStatus';

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

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'changePaymentTransferItem',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'changePaymentTransferItem',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Transferpaymenttable)
);
