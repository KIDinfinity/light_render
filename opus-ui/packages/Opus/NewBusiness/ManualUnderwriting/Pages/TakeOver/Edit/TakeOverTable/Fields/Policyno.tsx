import React from 'react';
import { Col } from 'antd';
import { FormItemInput } from 'basic/components/Form';
import useGetFieldConfig from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/TakeOverTableField/Policyno.config';
import { useFetchProductConfig } from '../../../hooks';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}

const Policyno = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const { calculatedEditable, calculatedVisible, calculatedRequired, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);
  const handleBlur = useFetchProductConfig();
  const isLast = form.getFieldValue('isLast');

  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemInput
        onBlur={(e: any) => handleBlur(e.target?.value)}
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={!isLast && calculatedRequired}
        placeholder=" "
        labelType="inline"
      />
    </Col>
  ) : null;
};

Policyno.displayName = 'policyNo';

export default Policyno;
