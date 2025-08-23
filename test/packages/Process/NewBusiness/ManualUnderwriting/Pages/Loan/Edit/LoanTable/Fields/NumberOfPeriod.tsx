import React from 'react';
import { Col } from 'antd';
import { FormItemNumber } from 'basic/components/Form';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/LoanTableField/NumberOfPeriod.config';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  labelType?: string;
}

const NumberOfPeriod = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  labelType,
}: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const { calculatedEditable, calculatedVisible, calculatedRequired, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);

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
        labelType={labelType}
        precision={0}
        max={10}
        placeholder=" "
      />
    </Col>
  ) : null;
};
NumberOfPeriod.displayName = 'numberOfPeriod';

export default NumberOfPeriod;
