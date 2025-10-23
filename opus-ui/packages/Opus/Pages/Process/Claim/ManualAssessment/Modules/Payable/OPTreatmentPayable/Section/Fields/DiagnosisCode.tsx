import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { isAdjustmentFun } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';
import { formUtils } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Payable.OPTreatmentPayable',
  field: 'diagnosisCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code-name',
    },
    'x-dict': {
      dictCode: 'dictCode',
      dictName: 'dictName',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, isAdjustment }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dictsOfDiagnosis = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.dictsOfDiagnosis
  );
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const diagnosisListMap = useSelector(
    ({ opusClaimAssessment }: any) => opusClaimAssessment.claimEntities.diagnosisListMap
  );

  const diagnosisList = lodash
    .chain(diagnosisListMap)
    .filter(
      (dictionasis) =>
        formUtils.queryValue(dictionasis.diagnosisName) &&
        formUtils.queryValue(dictionasis.diagnosisName) !== ''
    )
    .map((dictionasis) => {
      return {
        dictCode: dictionasis.diagnosisCode,
        dictName: dictionasis.diagnosisName?.value || dictionasis.diagnosisName,
      };
    })
    .value();

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={isAdjustmentFun(isAdjustment) ? dictsOfDiagnosis : diagnosisList}
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
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
        />
      </Col>
    )
  );
};

const DiagnosisCode = ({
  isShow,
  layout,
  form,
  editable,
  field,
  treatmentId,
  config,
  isAdjustment,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      config={config}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      isAdjustment={isAdjustment}
    />
  </Authority>
);

DiagnosisCode.displayName = 'diagnosisCode';

export default DiagnosisCode;
