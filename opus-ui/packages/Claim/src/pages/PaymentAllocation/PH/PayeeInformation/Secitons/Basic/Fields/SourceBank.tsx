import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, Visible, FormItemSelect } from 'basic/components/Form';
import { localFieldConfig } from './SourceBank.config';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import { VLD_000001 } from 'claim/pages/validators/fieldValidators';

export { localFieldConfig } from './SourceBank.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, payoutAmount }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const dicts = getDrowDownList('Dropdown_POS_SrcBank_Check');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={[
            {
              validator: VLD_000001(payoutAmount, formatMessageApi({ [config.label?.dictCode || fieldProps.label.dictCode]: config.label?.dictTypeCode || fieldProps.label.dictTypeCode })),
            },
          ]}
        />
      </Col>
    )
  );
};

const SourceBank = ({ field, config, isShow, layout, form, editable, payoutAmount }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      payoutAmount={payoutAmount}
    />
  </Authority>
);

SourceBank.displayName = localFieldConfig.field;

export default SourceBank;
