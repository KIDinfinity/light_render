import React from 'react';
import { Col } from 'antd';
import { FormItemInput } from 'basic/components/Form';
import { fieldConfig } from '../../../_config/DistributionChannelField/Bankcustomerid.config';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { requiredChannel } from '../../../validators';
import { tenant, Region } from '@/components/Tenant';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  id: string;
}
const Bankcustomerid = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const fieldProps: any = fieldConfig['field-props'];
  const { calculatedEditable, calculatedVisible, label, name } = useGetFieldConfig(
    propsConfig,
    config,
    fieldProps
  );

  const required = tenant.region({
    [Region.VN]: false,
    notMatch: requiredChannel(form),
  });

  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemInput
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={required}
      />
    </Col>
  ) : null;
};
Bankcustomerid.displayName = 'bankCustomerId';

export default Bankcustomerid;
