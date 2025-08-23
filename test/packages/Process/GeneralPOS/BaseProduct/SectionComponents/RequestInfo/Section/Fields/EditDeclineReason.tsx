import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule,
  Validator,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { localFieldConfig } from './EditDeclineReason.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export { localFieldConfig } from './EditDeclineReason.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const companyCode = useSelector(({ processTask }: any) => processTask?.getTask?.companyCode);

  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {
    VLD_001108: Validator.VLD_001108(5),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          allowClear
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
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          placeholder={
            companyCode == 2
              ? formatMessageApi({
                  Label_COM_WarningMessage: 'MSG_001254',
                })
              : ''
          }
        />
      </Col>
    )
  );
};

const EditDeclineReason = ({ isShow, layout, form, editable, config }: any) => (
  <Authority>
    <FormItem
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={localFieldConfig.field}
    />
  </Authority>
);

EditDeclineReason.displayName = localFieldConfig.field;

export default EditDeclineReason;
