import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './PartOfBodyInjuredArray.config';

export { localFieldConfig } from './PartOfBodyInjuredArray.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const claimType = form.getFieldValue('claimTypeArray');
  const partOfBodyInjuredRequire =
    lodash.includes(claimType, 'DIS') || lodash.includes(claimType, 'TPD');

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = partOfBodyInjuredRequire;

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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          maxLength={config?.maxLength || fieldProps.maxLength}
        />
      </Col>
    )
  );
};

const PartOfBodyInjuredArray = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

PartOfBodyInjuredArray.displayName = localFieldConfig.field;

export default PartOfBodyInjuredArray;
