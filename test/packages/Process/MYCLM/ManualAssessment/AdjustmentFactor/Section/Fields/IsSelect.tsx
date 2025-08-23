import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { NAMESPACE } from '../../../activity.config';
import {
  Authority,
  Editable,
  FormItemCheckbox,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './IsSelect.config';

export { localFieldConfig } from './IsSelect.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  dictCode,
  parentFactorCode,
  factorKey,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const factorList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.adjustmentFactorListMap?.[factorKey]?.factorList
  );

  const visibleConditions = true;
  const editableConditions = parentFactorCode
    ? formUtils.queryValue(factorList?.[parentFactorCode]?.isSelected)
    : true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemCheckbox
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={dictCode || config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
        />
      </Col>
    )
  );
};

const CriticalIllness = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  dictCode,
  parentFactorCode,
  factorKey,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      dictCode={dictCode}
      parentFactorCode={parentFactorCode}
      factorKey={factorKey}
    />
  </Authority>
);

CriticalIllness.displayName = localFieldConfig.field;

export default CriticalIllness;
