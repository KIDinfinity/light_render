import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
} from 'basic/components/Form';
import { DiagnosisType as EnumDiagnosticType } from 'basic/enum';
import { isExistPrimary } from 'process/JPCLM/ManualAssessment/_models/functions'

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'diagnosis.Add',
  field: 'diagnosisType',
  'field-props': {
    editable: 'Y',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.JPCA-of-manual-assessment.label.diagnosis-type',
    },
    required: 'N',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'DiagnosisType',
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

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const diagnosisListMap = useSelector(({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities.diagnosisListMap)
  const existCodes = isExistPrimary({ diagnosisListMap, incidentId }) ? [EnumDiagnosticType.Primary] : []

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode ||
      localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        dicts={dicts}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={(config.required || fieldProps.required) === Required.Yes}
        labelType={config.label?.type || fieldProps.label.type}
        existCodes={existCodes}
      />
    </Col>
  );
};

const DiagnosisTypeAdd = ({ field, config, form, editable, section, layout, isShow, incidentId }: any) => (
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

DiagnosisTypeAdd.displayName = localFieldConfig.field;

export default DiagnosisTypeAdd;
