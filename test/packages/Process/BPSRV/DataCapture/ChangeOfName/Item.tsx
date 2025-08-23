import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const Item = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="ChangeName">
      <Fields.ChangePrefix />
      <Fields.ChangeFirstName />
      <Fields.ChangeMiddleName />
      <Fields.ChangeSurname />
      <Fields.ReasonforChange />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { id }: any) => ({
    validating: formCommonController.validating,
    nameChange: modelnamepsace.entities?.transactionTypesMap?.[id]?.nameChange,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'changeOfNameInfoUpdate',
              payload: {
                changedFields,
                transactionId: id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'changeOfNameInfoUpdate',
            payload: {
              changedFields,
              transactionId: id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { nameChange } = props;
      return formUtils.mapObjectToFields(nameChange);
    },
  })(Item)
);
