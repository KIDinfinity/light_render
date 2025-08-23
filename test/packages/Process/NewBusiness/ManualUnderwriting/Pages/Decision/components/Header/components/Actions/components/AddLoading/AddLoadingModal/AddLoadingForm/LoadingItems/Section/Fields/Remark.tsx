import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
  FormItemAutoSizeTextArea,
} from 'basic/components/Form';
import { fieldConfig } from './Remark.config';
import { tenant, Region } from '@/components/Tenant';
export { fieldConfig } from './Remark.config';
import { getCompanyCode } from 'process/NewBusiness/ManualUnderwriting/_utils';

const FormItem = ({ isShow, layout, form, editable, field, config, coverageId, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  const companyCode = getCompanyCode();

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {tenant.region() === Region.ID || companyCode === '5' ? (
          <FormItemAutoSizeTextArea
            disabled={
              !editable ||
              ((config?.visible || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.visible || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config?.required || fieldProps.required) === Required.Yes
            }
            placeholder=" "
            maxLength={1000}
            hiddenPrefix
            precision={0}
            autoSize={true}
          />
        ) : (
          <FormItemInput
            disabled={
              !editable ||
              ((config?.visible || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.visible || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config?.required || fieldProps.required) === Required.Yes
            }
            labelType="inline"
            placeholder=" "
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Remark = ({ form, editable, layout, isShow, config, coverageId, id }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      coverageId={coverageId}
      id={id}
    />
  </Authority>
);

Remark.displayName = 'remark';

export default Remark;
