import React from 'react';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { ConfigDiagnosisType } from '../_hooks';
import { localFieldConfig } from './DiagnosisType.config';

export { localFieldConfig } from './DiagnosisType.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  incidentId,
  NAMESPACE,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict']?.dictTypeCode
      ]
  );

  const { Rules } = ConfigDiagnosisType({
    NAMESPACE,
    incidentId,
    diagnosisId: id,
  });

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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const DiagnosisType = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
  id,
  NAMESPACE,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      incidentId={incidentId}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

DiagnosisType.displayName = localFieldConfig.field;

export default DiagnosisType;
