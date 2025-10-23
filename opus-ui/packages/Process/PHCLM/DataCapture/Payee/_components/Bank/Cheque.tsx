import React from 'react';
import { useSelector, connect } from 'dva';

import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from '../../../activity.config';

import Section, { Fields } from '../../Secitons/Basic';

const Basic = ({ form, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="payeeBasic">
      <Fields.SourceBank />
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
        countryCode,
        item: { id: payeeId },
        validating,
      } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'savePayee',
              payload: {
                changedFields,
                countryCode,
                payeeId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'savePayee',
            payload: {
              changedFields,
              countryCode,
              payeeId,
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
