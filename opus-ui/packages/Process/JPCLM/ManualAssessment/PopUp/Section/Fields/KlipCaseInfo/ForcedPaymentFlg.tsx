import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  FormItemSelect,
  Required,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './ForcedPaymentFlg.config';

export { localFieldConfig } from './ForcedPaymentFlg.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps.editable, form, '');
  const requiredConditions = Rule(fieldProps.required, form, '');

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
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          mode="multiple"
          multipleString
        />
      </Col>
    )
  );
};

const ForcedPaymentFlg = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

ForcedPaymentFlg.displayName = 'ForcedPaymentFlg';

export default ForcedPaymentFlg;
