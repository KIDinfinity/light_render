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

import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';
import { localFieldConfig } from './PolicyId.config';

export { localFieldConfig } from './PolicyId.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, existCodes }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.policyList
  );
  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.isRegisterMcs
  );

  const visibleConditions = true;
  const editableConditions = !isRegisterMcs;
  const requiredConditions = Rule(fieldProps.required, form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={listPolicy}
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
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          existCodes={existCodes}
        />
      </Col>
    )
  );
};

const PolicyId = ({ field, config, form, isShow, editable, layout, existCodes }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      layout={layout}
      isShow={isShow}
      form={form}
      editable={editable}
      existCodes={existCodes}
    />
  </Authority>
);

PolicyId.displayName = 'PolicyId';

export default PolicyId;
