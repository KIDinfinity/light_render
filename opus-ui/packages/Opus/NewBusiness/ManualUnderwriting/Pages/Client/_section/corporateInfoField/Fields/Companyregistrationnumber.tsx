import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, FormItemInput, Rule } from 'basic/components/Form';

import { fieldConfig } from './Companyregistrationnumber.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export { fieldConfig } from './Companyregistrationnumber.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;
  const rules = !readOnly
    ? [
        {
          required: true,
          message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
        },
      ]
    : [];

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
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredConditions}
          hiddenPrefix
          precision={0}
          rules={rules}
        />
      </Col>
    )
  );
};

const Companyregistrationnumber = ({ isShow, layout, form, editable, config, readOnly }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
      readOnly={readOnly}
    />
  </Authority>
);

Companyregistrationnumber.displayName = 'companyRegistrationNumber';

export default Companyregistrationnumber;
