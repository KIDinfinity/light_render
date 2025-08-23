import React from 'react';
import { Col } from 'antd';
import { FormItemDatePicker } from 'basic/components/Form';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/DistributionChannelField/Campaigndate.config';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}

const Campaigndate = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
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

  return isShow && calculatedVisible ? (
    <Col {...layout}>
      <FormItemDatePicker
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}

        placeholder=" "
        allowFreeSelect
      />
    </Col>
  ) : null;
};

Campaigndate.displayName = 'campaignDate';

export default Campaigndate;
