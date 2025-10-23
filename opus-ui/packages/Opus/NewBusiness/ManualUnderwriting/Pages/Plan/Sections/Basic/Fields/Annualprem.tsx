import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Required,
  FormItemNumber,
} from 'basic/components/Form';

import { fieldConfig } from './Annualprem.config';

export { fieldConfig } from './Annualprem.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled
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
          precision={2}
          objectName="nb.policyList"
          objectFieldName="annualPrem"
        />
      </Col>
    )
  );
};

const Annualprem = ({ field, config, isShow, layout, form, editable }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Annualprem.displayName = 'annualPrem';

export default Annualprem;
