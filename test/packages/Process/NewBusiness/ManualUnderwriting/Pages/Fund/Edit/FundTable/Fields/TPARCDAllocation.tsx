import React from 'react';
import { Col } from 'antd';
import { FormItemNumber, formUtils } from 'basic/components/Form';
import { useAllocationConditions } from '../../../hooks';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/FundTableField/TPARCDAllocation.config';
interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}

export const TPARCDAllocation = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
}: IFiledProps) => {
  const { Rules, editableConditions } = useAllocationConditions(form);
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    Rules,
    propsEditableCondition: editableConditions,
  };
  const fieldProps: any = fieldConfig['field-props'];

  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    label,
    name,
    calculatedRules,
  } = useGetFieldConfig(propsConfig, config, fieldProps);
  const isLast = form.getFieldValue('isLast');
  const fundCode = formUtils.queryValue(form.getFieldValue('fundCode'));
  const isVI07 = fundCode === 'VI07';
  return !isLast && calculatedVisible ? (
    <Col {...layout}>
      <FormItemNumber
        disabled={!calculatedEditable || isVI07}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        labelType="inline"
        precision={0}
        rules={calculatedRules}
        placeholder=" "
      />
    </Col>
  ) : null;
};
TPARCDAllocation.displayName = 'tpaRcdAllocation';

export default TPARCDAllocation;
