import React from 'react';
import { NAMESPACE } from '../../../../activity.config';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';

import { useSelector } from 'dva';
import { IncidentCode } from 'claim/pages/Enum';
import { useGetInputLimitDate } from 'process/HKCLM/_hooks';
import { localFieldConfig } from './IncidentDate.config';

export { localFieldConfig } from './IncidentDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];

  const isManualAdd = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]?.isManualAdd
  );

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const claimType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]?.claimTypeArray
  );

  const ClaimTypeMIOrCI = lodash.some(
    formUtils.queryValue(claimType),
    (item) => item === IncidentCode.Mental || item === IncidentCode.Crisis
  );

  const visibleConditions = true;
  const editableConditions =
    !(
      Rule(
        fieldProps['editable-condition'],
        form,
        `${NAMESPACE}.claimEntities.incidentListMap[${incidentId}]`
      ) ||
      (isRegisterMcs && !isManualAdd)
    ) || ClaimTypeMIOrCI;

  const requiredConditions = Rule(fieldProps['required-condition'], form, '') || ClaimTypeMIOrCI;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
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
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const IncidentDate = ({ field, config, isShow, layout, form, editable, incidentId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
    />
  </Authority>
);

IncidentDate.displayName = localFieldConfig.field;

export default IncidentDate;
