import React from 'react';
import lodash from 'lodash';

import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  Rule,
  FormItemSelect,
} from 'basic/components/Form';

import { getDrowDownList } from '@/utils/dictFormatMessage';

import { localFieldConfig } from './ProcedureCode.config';

export { localFieldConfig } from './ProcedureCode.config';

export const FormItem = ({ isShow, layout, form, editable, config, noPolicyNo }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || localFieldConfig.field}
          allowClear
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const ProductCode = ({ config, isShow, layout, form, editable, noPolicyNo }: any) => (
  <Authority>
    <FormItem
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      noPolicyNo={noPolicyNo}
    />
  </Authority>
);

ProductCode.displayName = 'productCode';

export default ProductCode;
