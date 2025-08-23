import React, { useMemo } from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  formUtils,
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
  onChange,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

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
  const visibleConditions = true;
  const editableConditions = true;

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
          searchName="diagnosis"
          dropdownCode="claim_dict004"
          optionShowType="both"
          onChange={onChange}
          disabledDictCodes={repeatableCodeList}
          labelType={config.label?.type || fieldProps.label.type}
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
  onChange,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      onChange={onChange}
    />
  </Authority>
);

DiagnosisCodeAdd.displayName = localFieldConfig.field;

export default DiagnosisCodeAdd;
