import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Add = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} section="DeleteRiders" editable={editable}>
      <Fields.ProductCodeAdd />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, dicts, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        console.log('validating', validating);
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'DeleteRidersRiderListAdd',
              payload: {
                changedFields,
                transactionId,
                dicts,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'DeleteRidersRiderListAdd',
            payload: {
              changedFields,
              transactionId,
              dicts,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields({ dicts, existCodes }: any) {
      return formUtils.mapObjectToFields({ dicts, productCode: '', existCodes });
    },
  })(Add)
);
