import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import ShortcutOf360 from 'basic/components/ShortcutOf360';
import { localConfig } from '../index';
import { localFieldConfig } from './InsuredFullName.config';

export { localFieldConfig } from './InsuredFullName.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, clientId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <ShortcutOf360 activeClientId={clientId} activeCustomerType="CUS001">
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
            rules={lodash.compact(
              (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
          />
        </ShortcutOf360>
      </Col>
    )
  );
};

const InsuredFullName = ({ isShow, layout, form, editable, section, clientId }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} clientId={clientId} />
    </ElementConfig.Field>
  </Authority>
);

InsuredFullName.displayName = localFieldConfig.field;

export default InsuredFullName;
