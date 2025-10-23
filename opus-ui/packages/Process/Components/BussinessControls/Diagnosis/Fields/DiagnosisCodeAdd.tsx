import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
  formUtils,
  Rule,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import { localFieldConfig } from './DiagnosisCodeAdd.config';

export { localFieldConfig } from './DiagnosisCodeAdd.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  NAMESPACE,
  onChange,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.diagnosisListMap
  );

  const repeatableCodeList = useMemo(
    () =>
      lodash
        .chain(diagnosisListMap)
        .filter((item) => item.incidentId === incidentId)
        .map((item) => formUtils.queryValue(item.diagnosisCode))
        .uniq()
        .value(),
    [diagnosisListMap]
  );

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
          onChange={onChange}
          searchName="diagnosis"
          dropdownCode="claim_dict004"
          optionShowType="both"
          disabledDictCodes={repeatableCodeList}
        />
      </Col>
    )
  );
};

const DiagnosisCodeAdd = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
  isManualAdd,
  NAMESPACE,
  onChange,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      isManualAdd={isManualAdd}
      NAMESPACE={NAMESPACE}
      onChange={onChange}
    />
  </Authority>
);

DiagnosisCodeAdd.displayName = localFieldConfig.field;

export default DiagnosisCodeAdd;
