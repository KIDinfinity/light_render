import React from 'react';
import { Col } from 'antd';
import { FormItemSelect } from 'basic/components/Form';
import { fieldConfig } from '../../../_config/DistributionChannelField/BankChannel.config';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { useSelector } from 'dva';
import { requiredChannel } from '../../../validators';
import { finalBankChannelDictsSelector } from '../../../selectors';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
  id: string;
}
const BankChannel = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
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

  const dicts = useSelector(finalBankChannelDictsSelector);
  const required = requiredChannel(form);

  return calculatedVisible ? (
    <Col {...layout}>
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
    </Col>
  ) : null;
};
BankChannel.displayName = 'bankNo';

export default BankChannel;
