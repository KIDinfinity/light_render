import React from 'react';
import { Col } from 'antd';
import { FormItemInput } from 'basic/components/Form';

import { fieldConfig } from '../../../_config/PolicyReplacementTableField/Planname.config';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Planname = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    label,
    name,
  } = useGetFieldConfig(propsConfig, config, fieldProps);
  const isLast = form.getFieldValue('isLast');
  const index = form.getFieldValue('index');
  const isOnlyOne = index === 0 && isLast;
  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemInput
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={isOnlyOne || (!isLast && calculatedRequired)}
        labelType="inline"
        placeholder=""
      />
    </Col>
  ) : null;
};

Planname.displayName = 'planName';

export default Planname;
