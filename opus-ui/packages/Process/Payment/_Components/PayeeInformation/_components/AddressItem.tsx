import React from 'react';
import { useSelector, connect } from 'dva';

import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';

import Section, { Fields } from '../Secitons/Address';

const Basic = ({ form, item, idx }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      form={form}
      editable={editable}
      section="payee.Address"
      idx={idx}
      formId={`payeeAddress${item.id}`}
    >
      <Fields.PostCode />
      <Fields.Address />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        item: { id },
        validating,
        NAMESPACE,
      } = props;
      // TODO:为什么点confirm会触发两次onFieldsChange

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'paymentPayeeItemContactListUpdate',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'paymentPayeeItemContactListUpdate',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(Basic)
);
