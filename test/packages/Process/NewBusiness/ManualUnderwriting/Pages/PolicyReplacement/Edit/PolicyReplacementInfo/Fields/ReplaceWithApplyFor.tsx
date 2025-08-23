import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { FormItemSelect } from 'basic/components/Form';

import { fieldConfig } from '../../../_config/PolicyReplacementField/ReplaceWithApplyFor.config';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import useHandleChangeReplacementCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeReplacementCallback';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}
const ReplaceWithApplyFor = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
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
  const handleChange = useHandleChangeReplacementCallback();

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
        onChange={(value: string) => {
          handleChange({
            value,
            name: field,
          });
        }}
      />
    </Col>
  ) : null;
};

ReplaceWithApplyFor.displayName = 'replaceWithApplyFor';

export default ReplaceWithApplyFor;
