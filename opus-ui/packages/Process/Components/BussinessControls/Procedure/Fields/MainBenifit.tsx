import React from 'react';

import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { ConfigMainBenifit } from '../_hooks';
import { localFieldConfig } from './MainBenifit.config';

export { localFieldConfig } from './MainBenifit.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  treatmentId,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict']?.dictTypeCode
      ]
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { extraConfig } = ConfigMainBenifit({ NAMESPACE, treatmentId });

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType={config.label?.type || fieldProps.label.type}
          {...extraConfig}
        />
      </Col>
    )
  );
};

const MainBenifit = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  id,
  NAMESPACE,
  treatmentId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
      treatmentId={treatmentId}
    />
  </Authority>
);

MainBenifit.displayName = localFieldConfig.field;

export default MainBenifit;
