import React from 'react';
import { Col } from 'antd';
import { FormItemInput } from 'basic/components/Form';

import { fieldConfig } from '../../../_config/PolicyReplacementTableField/Otherreason.config';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Otherreason = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isLast = form.getFieldValue('isLast');
  const propsConfig = {
    field,
    editable,
    isShow: isShow && !isLast,
    form,
    propsEditableCondition: form.getFieldValue('policyType') !== 'Others',
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
        labelType="inline"
        placeholder=""
      />
    </Col>
  ) : null;
};

Otherreason.displayName = 'otherReason';

export default Otherreason;
