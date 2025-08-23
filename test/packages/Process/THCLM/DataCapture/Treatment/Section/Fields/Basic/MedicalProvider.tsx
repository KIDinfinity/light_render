import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useDispatch, useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { getMedicalProvider } from 'claim/pages/utils/claimUtils';
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

  const caseCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.caseCategory
  );

  const dispatch = useDispatch();
  const onSelect = (value: any, typeCode: any) => {
    dispatch({
      type: `${NAMESPACE}/saveTreatmentItem`,
      payload: {
        changedFields: { hospitalType: typeCode },
        incidentId,
        treatmentId,
      },
    });
  };
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onSelectCallback={onSelect}
          searchName="medicalProviderth"
          searchCustom={getMedicalProvider(caseCategory)}
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
  treatmentId,
  incidentId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
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
