import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import { DiagnosisType as EnumDiagnosticType } from 'basic/enum';
import { isExistPrimary } from '../../../../_models/functions'
import { getDrowDownList } from '@/utils/dictFormatMessage';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Diagnosis',
  field: 'diagnosisType',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.JPCA-of-manual-assessment.label.diagnosis-type',
    },
    'x-dict': { dictTypeCode: 'DiagnosisType' },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const diagnosisListMap = useSelector(({ opusClaimAssessment }: any) => opusClaimAssessment.claimEntities.diagnosisListMap)
  const existCodes = isExistPrimary({ diagnosisListMap, incidentId }) ? [EnumDiagnosticType.Primary] : []

  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode)


  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          existCodes={existCodes}
        />
      </Col>
    )
  );
};

const DiagnosisType = ({ field, config, isShow, layout, form, editable, incidentId }: any) => (
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

DiagnosisType.displayName = 'DiagnosisType';

export default DiagnosisType;
