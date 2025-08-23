import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { fieldConfig } from './BankChannel.config';
import useGetDistributionRequiredByChannel from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionRequiredByChannel';
import useGetFinalBankChannelList from 'process/NB/ManualUnderwriting/_hooks/useGetFinalBankChannelList';

export { fieldConfig } from './BankChannel.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const bankChannelList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankChannelList,
    shallowEqual
  );
  const finalBankChannelList = useGetFinalBankChannelList({
    bankChannelList,
  });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const required = useGetDistributionRequiredByChannel({ id });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={finalBankChannelList}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const BankChannel = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

BankChannel.displayName = 'bankNo';

export default BankChannel;
