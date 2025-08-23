import React from 'react';
import { Col } from 'antd';
import { FormItemNumber } from 'basic/components/Form';
import { useAllocationConditions } from '../../../hooks';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/FundTableField/Fundallocation.config';
interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}

export const Fundallocation = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
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
  return !isLast && calculatedVisible ? (
    <Col {...layout}>
      <FormItemNumber
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        labelType="inline"
        placeholder=" "
        precision={0}
        rules={calculatedRules}
      />
    </Col>
  ) : null;
};

Fundallocation.displayName = 'fundAllocation';

export default Fundallocation;
