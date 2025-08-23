import React, { useMemo, useState } from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  formUtils,
  Required,
  Visible,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
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
  diagnosisId,
  isManualAdd,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.diagnosisListMap
  );

  const [warnDiagnosisCode]: any = useState([]);

  const searchIsCIByDiagnosisCode = (value: string) => {
    dispatch({
      type: `${NAMESPACE}/checkIsCIByDiagnosisCode`,
      payload: {
        diagnosisId,
        incidentId,
        searchCode: value,
      },
    });
  };

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
  const incidentNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]?.incidentNo
  );
  const firstIncidentId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[0]?.incidentId
  );
  const diagnosisItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.diagnosisListMap[diagnosisId]
  );

  const visibleConditions = true;
  const editableConditions =
    isManualAdd ||
    diagnosisItem?.isManualAdd ||
    !(isRegisterMcs && (Number(incidentNo) === 1 || firstIncidentId === incidentId));

  const requiredConditions = lodash.isEmpty(diagnosisListMap);

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
          onSelectCallback={searchIsCIByDiagnosisCode}
          warningMessage={warnDiagnosisCode}
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const DiagnosisCodeAdd = ({
  field,
  config,
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
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      diagnosisId={diagnosisId}
      isManualAdd={isManualAdd}
    />
  </Authority>
);

DiagnosisCodeAdd.displayName = localFieldConfig.field;

export default DiagnosisCodeAdd;
