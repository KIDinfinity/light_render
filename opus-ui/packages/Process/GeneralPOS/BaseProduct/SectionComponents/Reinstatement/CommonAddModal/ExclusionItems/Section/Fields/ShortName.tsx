import React, { useEffect } from 'react';
import { Col } from 'antd';
import {
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './ShortName.config';
export { localFieldConfig } from './ShortName.config';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import lodash from 'lodash';

const FormItem = ({ isShow, layout, form, editable, field, config, addData }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const productCode = formUtils.queryValue(addData?.productCode);
  const code = form.getFieldValue('code');

  const exclusionCodes = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.dictObject?.exclusionCodes
  );
  const dicts =
    lodash
      .chain(exclusionCodes)
      .filter((item) => item.productCode === productCode || lodash.isEmpty(item.productCode))
      .map((item: any) => {
        return {
          dictCode: item?.longDesc,
          dictName: item?.longDesc,
          originCode: item?.localExclusionCode,
        };
      })
      .value() || [];

  useEffect(() => {
    form.setFieldsValue({
      [localFieldConfig.field]: dicts?.find((item) => item?.originCode === code)?.dictCode,
    });
  }, [code]);

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
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          placeholder=" "
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
