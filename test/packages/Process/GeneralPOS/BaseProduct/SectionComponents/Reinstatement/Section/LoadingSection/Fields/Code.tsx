import React from 'react';
import { Col } from 'antd';
import {
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './Code.config';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
export { localFieldConfig } from './Code.config';
import lodash from 'lodash';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const productCode = form.getFieldValue('productCode')
  const loadingReasons = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.dictObject?.loadingReasons
  );
  const dicts =
    useSelector(
      ({ dictionaryController }: any) =>
        dictionaryController[
          config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
        ]
    ) || [];
  const filterDicts = loadingReasons?.[productCode]
    ? dicts.filter((item) => lodash.includes(loadingReasons?.[productCode], item?.dictCode))
    : dicts;

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
          getPopupContainer={() => document.querySelector('.Reinstatement') || document.body}
          dicts={filterDicts}
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
          optionShowType="both"
          isInline
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
