import React, { useEffect, useRef } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Validator,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './NextPaymentMode.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
export { localFieldConfig } from './NextPaymentMode.config';

const NextPaymentMode = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  isNotDataCapture,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = getDrowDownList({ config, fieldProps });

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
        <FormItemSelect
          dicts={dicts?.filter((dict) => dict.dictCode !== 'S')}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config?.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

NextPaymentMode.displayName = localFieldConfig.field;

export default NextPaymentMode;
