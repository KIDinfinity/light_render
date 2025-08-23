import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { localFieldConfig } from './DiagnosisType.config';

export { localFieldConfig } from './DiagnosisType.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  diagnosisId,
  incidentId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const diagnosisList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]?.diagnosisList
  );
  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.diagnosisListMap
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const Rules = {
    checkDiagnosisDuplicate: Validator.checkDiagnosisDuplicate(
      diagnosisList,
      diagnosisListMap,
      diagnosisId
    ),
  };

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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          labelType="inline"
        />
      </Col>
    )
  );
};

const DiagnosisType = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
  diagnosisId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      diagnosisId={diagnosisId}
      incidentId={incidentId}
    />
  </Authority>
);

DiagnosisType.displayName = localFieldConfig.field;

export default DiagnosisType;
