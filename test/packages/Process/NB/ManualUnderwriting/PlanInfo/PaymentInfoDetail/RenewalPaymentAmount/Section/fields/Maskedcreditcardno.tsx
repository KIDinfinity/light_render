import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetPayType from 'process/NB/ManualUnderwriting/_hooks/useGetPayType';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemInput,
  RuleByForm,
  Validator,
} from 'basic/components/Form';
import useCheckIdentityTypeIsID from 'process/NB/ManualUnderwriting/_hooks/useCheckIdentityTypeIsID';

import { fieldConfig } from './Maskedcreditcardno.config';

export { fieldConfig } from './Maskedcreditcardno.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const payTypeCollection = useGetPayType();
  const renewalPayType = lodash.get(payTypeCollection, 'renewalPayType');
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = formUtils.queryValue(renewalPayType) === 'R';
  const valueIsID = useCheckIdentityTypeIsID({ monitorValue: form.getFieldValue('identityType') });
  const Rules = {
    VLD_000269: Validator.VLD_000269(valueIsID, 16),
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

const Maskedcreditcardno = ({ isShow, layout, form, editable, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={config?.field}
      config={lodash.get(config, 'field-props')}
    />
  </Authority>
);

Maskedcreditcardno.displayName = 'maskedNumber';

export default Maskedcreditcardno;
