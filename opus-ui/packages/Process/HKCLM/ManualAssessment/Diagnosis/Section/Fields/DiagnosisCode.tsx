import React, { useState, useMemo } from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  formUtils,
  Required,
  Visible,
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
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const [warnDiagnosisCode]: any = useState([]);

  const claimNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.claimNo
  );

  const searchIsCIByDiagnosisCode = (value: string) => {
    dispatch({
      type: `${NAMESPACE}/checkIsCIByDiagnosisCode`,
      payload: {
        claimNo,
        diagnosisId,
        incidentId,
        searchCode: value,
      },
    });
  };

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
              ? !!isRegisterMcs || !diagnosisItem?.isManualAdd
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

const DiagnosisCode = ({
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
      incidentId={incidentId}
      diagnosisId={diagnosisId}
    />
  </Authority>
);

DiagnosisCode.displayName = localFieldConfig.field;

export default DiagnosisCode;
