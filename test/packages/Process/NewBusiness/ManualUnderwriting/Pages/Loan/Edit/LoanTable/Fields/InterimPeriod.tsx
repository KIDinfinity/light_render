import React from 'react';
import { Col } from 'antd';
import { FormItemNumber } from 'basic/components/Form';
import { fieldConfig } from '../../../_config/LoanTableField/InterimPeriod.config';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  labelType?: string;
}
const InterimPeriod = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  labelType = '',
}: IFiledProps) => {
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const fieldProps: any = fieldConfig['field-props'];
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
        max={10}
        precision={0}
        placeholder=" "
      />
    </Col>
  ) : null;
};

InterimPeriod.displayName = 'interimPeriod';

export default InterimPeriod;
