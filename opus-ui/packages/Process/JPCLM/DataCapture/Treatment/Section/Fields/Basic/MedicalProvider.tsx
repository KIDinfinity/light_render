import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  formUtils,
} from 'basic/components/Form';
import { ClaimType } from 'claim/enum';

import { useDispatch, useSelector } from 'dva';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.basic',
  field: 'medicalProvider',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.medical-provider',
    },
    visible: 'Y',
    required: 'C',
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  treatmentId,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const onSelect = (value: any, typeCode: any) => {
    dispatch({
      type: 'JPCLMOfDataCapture/treatmentUpdate',
      payload: {
        changedFields: { hospitalType: typeCode },
        incidentId,
        treatmentId,
      },
    });
  };
  const treatmentItem = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.claimEntities.treatmentListMap?.[treatmentId]
  );
  const isTreatmentTypeIP = formUtils.queryValue(treatmentItem?.treatmentType) === ClaimType.IPD;
  const isTreatmentTypeOP = formUtils.queryValue(treatmentItem?.treatmentType) === ClaimType.OPD;
  const isTreatmentTypeIPOrOP = isTreatmentTypeIP || isTreatmentTypeOP;
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelectPlus
        form={form}
        disabled={!editable || config?.editable === Editable.No}
        required={
          config?.required === Required.Conditions
            ? isTreatmentTypeIPOrOP
            : config?.required === Required.Yes
        }
        onSelectCallback={onSelect}
        formName={field || fieldConfig.field}
        searchName="medicalProvider"
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        dropdownCode="claim_dict005"
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        optionShowType="name"
        name={config?.name}
      />
    </Col>
  );
};

const MedicalProvider = ({
  field,
  config,
  form,
  editable,
  incidentId,
  treatmentId,
  layout,
  isShow,
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
      treatmentId={treatmentId}
    />
  </Authority>
);

MedicalProvider.displayName = 'MedicalProvider';

export default MedicalProvider;
