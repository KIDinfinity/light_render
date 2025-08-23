import React from 'react';
import { Col } from 'antd';
import { FormItemSelect } from 'basic/components/Form';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/FundTableField/Fundcode.config';
import { useAutoAttachFundStatus, useFundCodeDictsByCurrentFundCode } from '../../../hooks';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}

export const Fundcode = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isLast = form.getFieldValue('isLast');
  const visibleConditions = true;
  const editableConditions = !useAutoAttachFundStatus();
  const requiredConditions = true;

  const fundCodeDicts = useFundCodeDictsByCurrentFundCode(form.getFieldValue('fundCode'));

  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    propsEditableCondition: editableConditions,
    propsVisibleCondition: visibleConditions,
    propsRequiredCondition: requiredConditions,
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
      <FormItemSelect
        dicts={fundCodeDicts}
        dictCode="fundCode"
        dictName="fundName"
        disabled={!isLast && !calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        labelType="inline"
        getPopupContainer={() => document.body}
        required={!isLast && calculatedRequired}
        placeholder=" "
      />
    </Col>
  ) : null;
};

Fundcode.displayName = 'fundCode';

export default Fundcode;
