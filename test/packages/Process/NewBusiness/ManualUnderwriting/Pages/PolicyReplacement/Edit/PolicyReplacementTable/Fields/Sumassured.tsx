import React from 'react';
import { Col } from 'antd';
import { FormItemNumber } from 'basic/components/Form';
import { fieldConfig } from '../../../_config/PolicyReplacementTableField/Sumassured.config';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
export const Sumassured = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
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
      <FormItemNumber
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        precision={0}
        placeholder=" "
        objectName="nb.policyList.replacementInfoList"
        objectFieldName="sumAssured"
        labelType="inline"
      />
    </Col>
  ) : null;
};

Sumassured.displayName = 'sumAssured';

export default Sumassured;
