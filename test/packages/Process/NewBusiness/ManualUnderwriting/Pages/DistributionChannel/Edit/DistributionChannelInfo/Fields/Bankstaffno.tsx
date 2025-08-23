import React from 'react';
import { Col } from 'antd';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/DistributionChannelField/Bankstaffno.config';
import { requiredChannel } from '../../../validators';
import { useBankStaffNoDictsByAgentNo } from '../../../hooks';
import useBankStaffNoBlurCallback from 'process/NewBusiness/ManualUnderwriting/_hooks/useBankStaffNoBlurCallback';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  id: string;
}
const Bankstaffno = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const agentNo = formUtils.queryValue(form.getFieldValue('agentNo'));
  const id = formUtils.queryValue(form.getFieldValue('id'));

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
  const required = requiredChannel(form);
  const dicts = useBankStaffNoDictsByAgentNo(agentNo);
  const handleBlur = useBankStaffNoBlurCallback({
    id,
  });

  return isShow && calculatedVisible ? (
    <Col {...layout}>
      {tenant.region({
        [Region.ID]: (
          <FormItemSelect
            dicts={dicts}
            onBlur={handleBlur}
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

Bankstaffno.displayName = 'bankStaffNo';

export default Bankstaffno;
