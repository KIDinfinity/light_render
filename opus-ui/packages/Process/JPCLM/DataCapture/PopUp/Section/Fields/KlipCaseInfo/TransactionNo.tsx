import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  FormItemNumber,
  Required,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './TransactionNo.config';

export { localFieldConfig } from './TransactionNo.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const isRegisterMcs = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.isRegisterMcs
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = isRegisterMcs;
  const requiredConditions = Rule(fieldProps.required, form, '');
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          form={form}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? editableConditions
              : config?.editable === Editable.No)
          }
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          name={config?.name}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          min={1}
          max={999}
          precision={0}
        />
      </Col>
    )
  );
};

const TransactionNo = ({ field, config, isShow, layout, form, editable }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

TransactionNo.displayName = 'TransactionNo';

export default TransactionNo;
