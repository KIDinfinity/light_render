import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelectPlus,
  formUtils,
} from 'basic/components/Form';
import { ClaimType } from 'claim/enum';

import { useDispatch, useSelector } from 'dva';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.Basic.Expand',
  field: 'medicalProvider',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.medical-provider',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'no-invoice-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };

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
  const dispatch = useDispatch();
  const onSelect = (value: any, typeCode: any) => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/saveTreatmentItem',
      payload: {
        changedFields: { hospitalType: typeCode },
        incidentId,
        treatmentId,
      },
    });
  };
  const treatmentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.treatmentListMap?.[treatmentId]
  );
  const isTreatmentTypeIP = formUtils.queryValue(treatmentItem?.treatmentType) === ClaimType.IPD;
  const isTreatmentTypeOP = formUtils.queryValue(treatmentItem?.treatmentType) === ClaimType.OPD;

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = isTreatmentTypeIP || isTreatmentTypeOP; //Rule(fieldProps['required-condition'], form, '');

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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onSelectCallback={onSelect}
          searchName="medicalProvider"
          dropdownCode="claim_dict005"
          optionShowType="name"
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
  incidentId,
  treatmentId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      treatmentId={treatmentId}
    />
  </Authority>
);

MedicalProvider.displayName = 'MedicalProvider';

export default MedicalProvider;
