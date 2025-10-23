import React, { useState, useMemo } from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './DiagnosisCode.config';

export { localFieldConfig } from './DiagnosisCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  diagnosisId,
  isManualAdd,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const [warnDiagnosisCode]: any = useState([]);

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

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const diagnosisItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.diagnosisListMap[diagnosisId]
  );

  const visibleConditions = true;
  const editableConditions = isManualAdd || diagnosisItem?.isManualAdd || !isRegisterMcs;
  const requiredConditions = true;

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          searchName="diagnosis"
          dropdownCode="claim_dict004"
          optionShowType="both"
          disabledDictCodes={repeatableCodeList}
          warningMessage={warnDiagnosisCode}
          labelType={config.label?.type || fieldProps.label.type}
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
  incidentId,
  diagnosisId,
  isManualAdd,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      diagnosisId={diagnosisId}
      isManualAdd={isManualAdd}
    />
  </Authority>
);

DiagnosisCode.displayName = localFieldConfig.field;

export default DiagnosisCode;
