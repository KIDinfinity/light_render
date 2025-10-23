import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { fieldConfig } from './FacultativeReason.config';
export { fieldConfig } from './FacultativeReason.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetFacultativeReasonFieldVisible from 'decision/_hooks/useGetFacultativeReasonFieldVisible';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  coverageItem,
  colClassName,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const visibleConditions = useGetFacultativeReasonFieldVisible({
    productCode: formUtils.queryValue(coverageItem?.productCode),
  });
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} className={colClassName}>
        <FormItemSelect
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          dicts={dicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          precision={0}
          optionShowType="both"
          placeholder=" "
          labelType="inline"
          getPopupContainer={() => document.getElementById('BenefitEditContainer')}
        />
      </Col>
    )
  );
};

const FacultativeReason = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  coverageItem,
  colClassName,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={field}
        // 有两种不同的section下面有这个field，两种section传入的config的层级是不同的，需要做兼容
        config={config?.['field-props'] || config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        coverageItem={coverageItem}
        colClassName={colClassName}
      />
    </Authority>
  );
};

FacultativeReason.displayName = 'facultativeReason';

export default FacultativeReason;
