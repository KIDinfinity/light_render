import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemInput,
  RuleByForm,
  Validator,
} from 'basic/components/Form';
import AuthorizedAtomEditable from '@/auth/Components/Authorized/AuthorizedAtomEditable';

import { fieldConfig } from './Creditcardno.config';

export { fieldConfig } from './Creditcardno.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = form.getFieldValue('renewalPayType') === 'R';
  const Rules = {
    VLD_000269: Validator.VLD_000269(form.getFieldValue('identityType') === 'ID', 16),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Creditcardno = ({ isShow, layout, form, editable, config }: any) => (
  <Authority>
    <AuthorizedAtomEditable currentAuthority={'CreditCardNo'} editable={editable}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        field={fieldConfig?.field}
        config={config}
      />
    </AuthorizedAtomEditable>
  </Authority>
);

Creditcardno.displayName = 'creditCardNumber';

export default Creditcardno;
