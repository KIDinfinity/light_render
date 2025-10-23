import React, { useEffect } from 'react';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { ConfigDiagnosisCode } from '../_hooks';
import { localFieldConfig } from './DiagnosisCode.config';

export { localFieldConfig } from './DiagnosisCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  incidentId,
  id,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const { editableConditions: editableConfig, Rules, extraConfig } = ConfigDiagnosisCode({
    NAMESPACE,
    incidentId,
    diagnosisId: id,
  });

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '') || editableConfig;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const isManualAddDiagnosisID = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isManualAddDiagnosisID
  );

  useEffect(() => {
    if (isManualAddDiagnosisID === id) {
      form.validateFields([config.name || field], { force: true });
    }
  }, []);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          {...extraConfig}
        />
      </Col>
    )
  );
};

const DiagnosisCode = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  NAMESPACE,
  incidentId,
  id,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      incidentId={incidentId}
      id={id}
    />
  </Authority>
);

DiagnosisCode.displayName = localFieldConfig.field;

export default DiagnosisCode;
