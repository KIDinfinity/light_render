import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  FormItemSelectPlus,
  Required,
  Visible,
} from 'basic/components/Form';
import { localFieldConfig } from './Doctor.config';
export { localFieldConfig } from './Doctor.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const datas: any = form.getFieldsValue([
    'medicalProvider',
    'medicalProviderPlace',
    'hospitalType',
  ]);

  const showSelect: boolean = useMemo(() => {
    const { medicalProvider, medicalProviderPlace, hospitalType } = datas;
    return (medicalProvider === '998' && medicalProviderPlace === 'HK') || hospitalType === 'P';
  }, [datas]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {showSelect ? (
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
            searchName="nameOfDoctor"
            dropdownCode="misc_dict032"
            optionShowType="both"
            isPassCodeName={true}
            isFreeText={true}
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
            maxLength={config?.maxLength || fieldProps.maxLength}
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
          />
        )}
      </Col>
    )
  );
};

const Doctor = ({
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

Doctor.displayName = localFieldConfig.field;

export default Doctor;
