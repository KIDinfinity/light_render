import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import getFieldRequiredByFormConditions from 'basic/utils/getFieldRequiredByFormConditions';
import { fieldConfig } from './Charityorganizationcode.config';

export { fieldConfig } from './Charityorganizationcode.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const required = getFieldRequiredByFormConditions({ config, form, disabled: !editable });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          required={required}
          hiddenPrefix
          precision={0}
          labelType="inline"
          placeholder={''}
        />
      </Col>
    )
  );
};

const Charityorganizationcode = ({ field, form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={field}
    />
  </Authority>
);

Charityorganizationcode.displayName = 'charityOrganizationCode';

export default Charityorganizationcode;
