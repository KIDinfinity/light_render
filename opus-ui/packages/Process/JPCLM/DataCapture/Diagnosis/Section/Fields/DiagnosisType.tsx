import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { DiagnosisType as EnumDiagnosticType } from 'basic/enum';
import { isExistPrimary } from 'process/JPCLM/DataCapture/_models/functions'
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'diagnosis',
  field: 'diagnosisType',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.JPCA-of-manual-assessment.label.diagnosis-type',
    },
    required: 'Y',
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
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'no-treatment-layout': {
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

const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const diagnosisListMap = useSelector(({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities.diagnosisListMap)
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
        existCodes={existCodes}
      />
    </Col>
  );
};

const DiagnosisType = ({ field, config, form, editable, layout, isShow, incidentId }: any) => (
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
