import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import Section, { Fields } from './Section';

const Item = ({ form, item, NAMESPACE, treatmentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} section="JPAC" editable={editable}>
      <Fields.ProcedureType />
      <Fields.FromDate />
      <Fields.ServiceItemDescription />
      <Fields.Expense />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, item, NAMESPACE } = props;
      const { id, invoiceId } = item;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'serviceUpdate',
              payload: {
                changedFields,
                serviceItemId: id,
                invoiceId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'serviceUpdate',
            payload: {
              changedFields,
              serviceItemId: id,
              invoiceId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields({ ...item, procedureType: item.serviceItem });
    },
  })(Item)
);
