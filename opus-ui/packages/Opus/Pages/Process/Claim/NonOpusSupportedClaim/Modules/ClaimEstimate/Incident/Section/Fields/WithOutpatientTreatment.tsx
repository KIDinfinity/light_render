import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { localFieldConfig } from './WithOutpatientTreatment.config';

export { localFieldConfig } from './WithOutpatientTreatment.config';

export const FormItem = ({ isShow, layout, form, editable, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const Rules: any = {};

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
          existCodes={[]}
          form={form}
          formName={config?.name || localFieldConfig.field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          allowClear
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
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

const WithOutpatientTreatment = ({ isShow, layout, form, editable, section, config }: any) => (
  <Authority>
    <ElementConfig.Field config={config} section={section}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

WithOutpatientTreatment.displayName = localFieldConfig.field;

export default WithOutpatientTreatment;
