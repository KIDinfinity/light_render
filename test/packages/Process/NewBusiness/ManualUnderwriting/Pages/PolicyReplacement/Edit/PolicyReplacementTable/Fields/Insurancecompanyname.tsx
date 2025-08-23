import React from 'react';
import { Col } from 'antd';
import { FormItemInput } from 'basic/components/Form';

import { fieldConfig } from '../../../_config/PolicyReplacementTableField/Insurancecompanyname.config';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Insurancecompanyname = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isLast = form.getFieldValue('isLast');
  const index = form.getFieldValue('index');

  const propsConfig = {
    field,
    editable,
    isShow: isShow && !isLast,
    form,
    propsRequiredCondition: index === 0,
  };
  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    label,
    name,
  } = useGetFieldConfig(propsConfig, config, fieldProps);

  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemInput
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        getPopupContainer={() => document.body}
        labelType="inline"
        placeholder=""
      />
    </Col>
  ) : null;
};

Insurancecompanyname.displayName = 'insuranceCompanyName';

export default Insurancecompanyname;
