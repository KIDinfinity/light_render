import React from 'react';
import { Col } from 'antd';
import { Editable, Visible, FormItemNumber, formUtils, Rule } from 'basic/components/Form';
import { localFieldConfig } from './Pmloading.config';
export { localFieldConfig } from './Pmloading.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { useSelector } from 'dva';

const FormItem = ({ isShow, layout, form, editable, field, config, addData }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const productCode = formUtils.queryValue(addData?.productCode);

  const loadingReasonConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.dictObject?.loadingReasonConfig
  );
  const loadingRule = loadingReasonConfig?.[productCode] || {};
  const { rateMin, rateMax } = loadingRule;

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
          required={requiredConditions}
          min={rateMin || 0}
          max={rateMax || Infinity}
          hiddenPrefix
          precision={2}
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
