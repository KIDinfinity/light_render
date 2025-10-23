import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemInput,
  formUtils,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { ClaimType } from 'claim/enum';
import { localFieldConfig } from './MedicalProvider.config';

export { localFieldConfig } from './MedicalProvider.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  treatmentId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]
  );
  const claimTypeArray = formUtils.queryValue(lodash.get(incidentItem, 'claimTypeArray'));
  const isInclude =
    lodash.includes(claimTypeArray, ClaimType.IPD) ||
    lodash.includes(claimTypeArray, ClaimType.OPD);

  // const dispatch = useDispatch();
  // const onSelect = (value: any, typeCode: any) => {
  //   dispatch({
  //     type: `${NAMESPACE}/saveTreatmentItem`,
  //     payload: {
  //       changedFields: { hospitalType: typeCode },
  //       incidentId,
  //       treatmentId,
  //     },
  //   });

  //   dispatch({
  //     type: `${NAMESPACE}/getProviderPlaceByMedicalCode`,
  //     payload: {
  //       medicalProviderCode: value,
  //       treatmentId,
  //     },
  //   });
  // };
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = Rule(fieldProps['required-condition'], form, NAMESPACE) || isInclude;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          // onSelectCallback={onSelect}
          // searchName="medicalProvider"
          // dropdownCode="claim_dict005"
          // optionShowType="both"
        />
      </Col>
    )
  );
};

const MedicalProvider = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  incidentId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      incidentId={incidentId}
    />
  </Authority>
);

MedicalProvider.displayName = localFieldConfig.field;

export default MedicalProvider;
