import React from 'react';
import { Col } from 'antd';

import { FormItemSelect } from 'basic/components/Form';
import useGetFieldConfig from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

import { fieldConfig } from '../../../_config/TakeOverTableField/Productcode.config';
import { useProductDicts } from '../../../hooks';
interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Productcode = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const fieldProps: any = fieldConfig['field-props'];
  const policyNo = form.getFieldValue('policyNo');
  const dicts = useProductDicts(policyNo);

  const { calculatedEditable, calculatedVisible, calculatedRequired, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);
  const isLast = form.getFieldValue('isLast');

  return !isLast && calculatedVisible ? (
    <Col {...layout}>
      <FormItemSelect
        dicts={dicts}
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        labelType="inline"
        placeholder=" "
      />
    </Col>
  ) : null;
};

Productcode.displayName = 'productCode';

export default Productcode;
