import React from 'react';
import { Col } from 'antd';
import {
  Editable,
  FormItemSelect,
  Rule,
  Visible,
  Required,
} from 'basic/components/Form';
import { localFieldConfig } from './Flatmortality.config';
import { useSelector } from 'dva';
export { localFieldConfig } from './Flatmortality.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import lodash from 'lodash';
import useGetComputeDict from 'process/GeneralPOS/BaseProduct/_hooks/useGetComputeDict';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const productCode = form.getFieldValue('productCode');
  const dicts =
    useSelector(
      ({ dictionaryController }: any) =>
        dictionaryController[
          config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
        ]
    ) || [];
  const loadingReasonConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.dictObject?.loadingReasonConfig
  );
  const loadingRule = loadingReasonConfig?.[productCode] || {};
  const { feMin, feMax } = loadingRule || {};
  const filterDicts = useGetComputeDict({
    min: feMin,
    max: feMax,
    loadingRuleIsEmpty: lodash.isEmpty(loadingRule),
    dicts,
  });

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
          isInline
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
