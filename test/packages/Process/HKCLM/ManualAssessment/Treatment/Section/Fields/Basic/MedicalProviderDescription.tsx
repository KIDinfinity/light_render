import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  FormItemSelectPlus,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { NAMESPACE } from '../../../../activity.config';
import { useDispatch } from 'dva';
import { localFieldConfig } from './MedicalProviderDescription.config';

export { localFieldConfig } from './MedicalProviderDescription.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();

  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const {
    medicalProvider,
    medicalProviderPlace,
    id: treatmentId,
    incidentId,
  }: any = form.getFieldsValue(['medicalProvider', 'medicalProviderPlace', 'id', 'incidentId']);

  const showSelect: boolean = useMemo(() => {
    return (
      medicalProvider == '999' && (medicalProviderPlace == 'CN' || medicalProviderPlace == 'MO')
    );
  }, [medicalProvider, medicalProviderPlace]);

  const onSelect = ({ item: { dictName: medicalProviderDescription, typeCode } }: any) => {
    dispatch({
      type: `${NAMESPACE}/saveTreatmentItem`,
      payload: {
        changedFields: { hospitalType: typeCode, medicalProviderDescription },
        incidentId,
        treatmentId,
      },
    });
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {showSelect ? (
          <FormItemSelectPlus
            key={medicalProviderPlace} // Add key to force re-render
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
            searchName="nameOfDoctor"
            dropdownCode="claim_dict005"
            optionShowType="name"
            onSelectCallback={onSelect}
            selectCallbackItem
            otherParams={{ searchType: '3', provinceCode: medicalProviderPlace }}
            isFreeText={true}
            freeTextHiddenName
          />
        ) : (
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
            maxLength={config?.maxLength || fieldProps.maxLength}
          />
        )}
      </Col>
    )
  );
};

const MedicalProviderDescription = ({
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
MedicalProviderDescription.displayName = localFieldConfig.field;

export default MedicalProviderDescription;
