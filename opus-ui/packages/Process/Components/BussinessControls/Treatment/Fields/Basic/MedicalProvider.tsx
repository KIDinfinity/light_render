import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './MedicalProvider.config';

export { localFieldConfig } from './MedicalProvider.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  incidentId,
  treatmentId,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const dispatch = useDispatch();

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

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
          onSelectCallback={(value: any, typeCode: any) => {
            dispatch({
              type: `${NAMESPACE}/saveTreatmentItem`,
              payload: {
                changedFields: { hospitalType: typeCode },
                incidentId,
                treatmentId,
              },
            });

            dispatch({
              type: `${NAMESPACE}/getProviderPlaceByMedicalCode`,
              payload: {
                medicalProviderCode: value,
                treatmentId,
              },
            });
          }}
          searchName="medicalProvider"
          dropdownCode="claim_dict005"
          optionShowType="both"
        />
      </Col>
    )
  );
};

const MedicalProvider = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  id,
  NAMESPACE,
  treatmentId,
  incidentId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
      treatmentId={treatmentId}
      incidentId={incidentId}
    />
  </Authority>
);

MedicalProvider.displayName = localFieldConfig.field;

export default MedicalProvider;
