import React from 'react';
import { Col } from 'antd';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';

import { tenant, Region } from '@/components/Tenant';

import useGetFieldConfig from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/DistributionChannelField/ServicingBranch.config';
import { requiredChannel } from '../../../validators';
import { useBranchStaffNoDictsByBankNo } from '../../../hooks';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  id: string;
}
const ServicingBranch = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const bankNo = formUtils.queryValue(form.getFieldValue('bankNo'));
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
  };
  const { calculatedEditable, calculatedVisible, label, name } = useGetFieldConfig(
    propsConfig,
    config,
    fieldProps
  );

  const required = tenant.region({
    [Region.VN]: false,
    notMatch: requiredChannel(form),
  });

  const dicts = useBranchStaffNoDictsByBankNo(bankNo);

  return isShow && calculatedVisible ? (
    <Col {...layout}>
      {tenant.region({
        [Region.KH]: (
          <FormItemSelect
            dicts={dicts}
            disabled={!calculatedEditable}
            form={form}
            formName={name}
            labelId={label.dictCode}
            labelTypeCode={label.dictTypeCode}
            required={required}
            getPopupContainer={() => document.body}
          />
        ),
        notMatch: (
          <FormItemInput
            disabled={!calculatedEditable}
            form={form}
            formName={name}
            labelId={label.dictCode}
            labelTypeCode={label.dictTypeCode}
            required={required}
          />
        ),
      })}
    </Col>
  ) : null;
};

ServicingBranch.displayName = 'servicingBranch';

export default ServicingBranch;
