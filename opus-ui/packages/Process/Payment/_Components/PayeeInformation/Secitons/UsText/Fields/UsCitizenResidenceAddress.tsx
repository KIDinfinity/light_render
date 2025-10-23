import React from 'react';
import { Col } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Authority, Editable, FormItemInput, formUtils, Visible } from 'basic/components/Form';

import { localFieldConfig } from './UsCitizenResidenceAddress.config';

export { localFieldConfig } from './UsCitizenResidenceAddress.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, item }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          maxLength={config?.maxLength || fieldProps.maxLength}
          rules={[
            {
              required: formUtils.queryValue(item?.usCitizen) ,
              message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000001'}, formatMessageApi({[config.label?.dictTypeCode || fieldProps.label.dictTypeCode]: config.label?.dictCode || fieldProps.label.dictCode}) )
            },
          ]}
        />
      </Col>
    )
  );
};

const UsCitizenResidenceAddress = ({ field, config, isShow, layout, form, editable, ...rest }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      {...rest}
    />
  </Authority>
);

UsCitizenResidenceAddress.displayName = localFieldConfig.field;

export default UsCitizenResidenceAddress;
