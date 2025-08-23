import React from 'react';
import { Col } from 'antd';
import { FormItemInput, formUtils } from 'basic/components/Form';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/TakeOverTableField/Policyno.config';
import { useFetchProductConfig } from '../../../hooks';
import { CommonYN } from 'claim/enum';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  isTakeOverListEmpty?: boolean;
}

const Policyno = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isTakeOverListEmpty,
}: IFiledProps) => {
  const takeOverFlag = formUtils.queryValue(form.getFieldValue('takeOverFlag'));
  const propsRequiredCondition = takeOverFlag === CommonYN.YES || isTakeOverListEmpty;
  const fieldProps: any = fieldConfig['field-props'];
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    propsRequiredCondition,
  };
  const { calculatedEditable, calculatedVisible, calculatedRequired, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);
  const handleBlur = useFetchProductConfig();

  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemInput
        onBlur={(e: any) => handleBlur(e.target?.value)}
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        placeholder=" "
        labelType="inline"
      />
    </Col>
  ) : null;
};

Policyno.displayName = 'policyNo';

export default Policyno;
