import React from 'react';
import { Col } from 'antd';

import { FormItemSelect, formUtils } from 'basic/components/Form';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

import { fieldConfig } from '../../../_config/TakeOverTableField/Productcode.config';
import { useProductDicts } from '../../../hooks';
import { CommonYN } from 'claim/enum';
interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Productcode = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const takeOverFlag = formUtils.queryValue(form.getFieldValue('takeOverFlag'));
  const propsRequiredCondition = takeOverFlag === CommonYN.YES;
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    propsRequiredCondition,
  };
  const fieldProps: any = fieldConfig['field-props'];
  const policyNo = form.getFieldValue('policyNo');
  const dicts = useProductDicts(policyNo);

  const { calculatedEditable, calculatedVisible, calculatedRequired, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);

  return calculatedVisible ? (
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
