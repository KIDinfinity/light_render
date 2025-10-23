import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Item = ({ form, editable }: any) => {
  return (
    <Section form={form} section="DeleteRiders" editable={editable}>
      <Fields.Name />
      <Fields.ProductCode />
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
        validating,
        dicts,
        item: { id },
        transactionId,
      }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'DeleteRidersRiderListUpdate',
              payload: {
                changedFields,
                transactionId,
                dicts,
                id,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'DeleteRidersRiderListUpdate',
            payload: {
              changedFields,
              transactionId,
              dicts,
              id,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields({ item, existCodes, dicts }: any) {
      return formUtils.mapObjectToFields({ ...item, existCodes, dicts });
    },
  })(Item)
);
