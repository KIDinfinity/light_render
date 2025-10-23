import React from 'react';
import { Col } from 'antd';
import { FormItemInput } from 'basic/components/Form';

import useGetFieldConfig from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/TakeOverTableField/Planname.config';

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
  const { calculatedEditable, calculatedVisible, calculatedRequired, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);
  const isLast = form.getFieldValue('isLast');

  return !isLast && isShow && calculatedVisible ? (
    <Col {...layout}>
      <FormItemInput
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

Planname.displayName = 'planName';

export default Planname;
