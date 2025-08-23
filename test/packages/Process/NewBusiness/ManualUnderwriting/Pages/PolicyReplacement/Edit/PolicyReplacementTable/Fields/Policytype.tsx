import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { FormItemSelect } from 'basic/components/Form';

import { fieldConfig } from '../../../_config/PolicyReplacementTableField/Policytype.config';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const Policytype = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isLast = form.getFieldValue('isLast');
  const dicts = getDrowDownList({ config, fieldProps });
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    propsRequiredCondition: true,
  };
  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    label,
    name,
  } = useGetFieldConfig(propsConfig, config, fieldProps);
  const index = form.getFieldValue('index');
  const isOnlyOne = index === 0 && isLast;
  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemSelect
        dicts={dicts}
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={isOnlyOne || (!isLast && calculatedRequired)}
        getPopupContainer={() => document.body}
        labelType="inline"
        placeholder=""
      />
    </Col>
  ) : null;
};

Policytype.displayName = 'policyType';

export default Policytype;
