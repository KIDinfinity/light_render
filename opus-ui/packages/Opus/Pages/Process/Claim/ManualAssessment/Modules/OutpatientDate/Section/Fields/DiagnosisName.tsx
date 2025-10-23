import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
} from 'basic/components/Form';
import { isAdjustmentFun } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const fieldConfig = {
  section: 'OutpatientDateGroup',
  field: 'diagnosisIdList',
  'field-props': {
    editable: 'Y',
    required: 'Y',
    visible: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.diagnosis-name',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { fieldConfig };

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
  const fieldProps: any = fieldConfig['field-props'];
  const dictsOfDiagnosis = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.dictsOfDiagnosis
  );
  const isAdjustmentValue = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.claimEntities.treatmentListMap[treatmentId]?.isAdjustment
  );
  const isAdjustment = isAdjustmentFun(isAdjustmentValue);

  const diagnosisListMap = useSelector(
    ({ opusClaimAssessment }: any) => opusClaimAssessment.claimEntities.diagnosisListMap
  );

  const incidentDiagnosisIdList =
    useSelector(
      ({ opusClaimAssessment }: any) =>
        opusClaimAssessment.claimEntities.incidentListMap?.[incidentId]?.diagnosisList
    ) || [];

  const diagnosisList = lodash
    .chain(diagnosisListMap)
    .filter(
      (dictionasis) =>
        lodash.some(incidentDiagnosisIdList, (id) => id === dictionasis.id) &&
        formUtils.queryValue(dictionasis.diagnosisName) &&
        formUtils.queryValue(dictionasis.diagnosisName) !== ''
    )
    .map((dictionasis) => {
      return {
        ...dictionasis,
        dictCode: dictionasis.id,
        dictName: formUtils.queryValue(dictionasis.diagnosisName),
      };
    })
    .value();

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        dicts={isAdjustment ? dictsOfDiagnosis : diagnosisList || []}
        mode={'multiple'}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        disabled={!editable || config?.editable === Editable.No}
        required={(config.required || fieldProps.required) === Required.Yes}
      />
    </Col>
  );
};

const DiagnosisName = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  incidentId,
  treatmentId,
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

DiagnosisName.displayName = fieldConfig.field;

export default DiagnosisName;
