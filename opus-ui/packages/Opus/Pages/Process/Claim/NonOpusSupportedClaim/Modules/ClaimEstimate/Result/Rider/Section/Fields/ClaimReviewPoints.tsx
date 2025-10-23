import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemTextArea,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './ClaimReviewPoints.config';

export { localFieldConfig } from './ClaimReviewPoints.config';

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemTextArea
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            config.required === Required.Conditions ||
            localFieldConfig['field-props'].required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        />
      </Col>
    )
  );
};

const ClaimReviewPoints = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

ClaimReviewPoints.displayName = localFieldConfig.field;

export default ClaimReviewPoints;
