import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { FormItemSelect } from 'basic/components/Form';
import { fieldConfig } from '../../../_config/LoanTableField/Period.config';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  labelType?: string;
}
const Period = ({ isShow, layout, form, editable, field, config, labelType }: IFiledProps) => {
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
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
        labelType={labelType}
      />
    </Col>
  ) : null;
};

Period.displayName = 'period';

export default Period;
