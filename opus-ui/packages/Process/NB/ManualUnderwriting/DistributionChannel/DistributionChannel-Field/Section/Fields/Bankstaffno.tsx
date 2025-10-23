import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Visible,
  RuleByForm,
  FormItemSelect,
} from 'basic/components/Form';
import useGetDistributionRequiredByChannel from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionRequiredByChannel';
import useBankStaffNoBlurCallback from 'process/NB/ManualUnderwriting/_hooks/useBankStaffNoBlurCallback';
import { tenant, Region } from '@/components/Tenant';
import useGetBankStaffNoList from 'process/NB/ManualUnderwriting/_hooks/useGetBankStaffNoList';
import { fieldConfig } from './Bankstaffno.config';

export { fieldConfig } from './Bankstaffno.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const required = useGetDistributionRequiredByChannel({ id });
  const bankStaffNoList = useGetBankStaffNoList({ agentNo: form.getFieldValue('agentNo') });
  const handleBlur = useBankStaffNoBlurCallback({
    bankStaffNo: form.getFieldValue('bankStaffNo'),
    id,
  });
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {tenant.region({
          [Region.ID]: (
            <FormItemSelect
              dicts={bankStaffNoList}
              onBlur={handleBlur}
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
          ),
          notMatch: (
            <FormItemInput
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
          ),
        })}
      </Col>
    )
  );
};

const Bankstaffno = ({ field, config, form, editable, layout, isShow, id }: any) => (
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

Bankstaffno.displayName = 'bankStaffNo';

export default Bankstaffno;
