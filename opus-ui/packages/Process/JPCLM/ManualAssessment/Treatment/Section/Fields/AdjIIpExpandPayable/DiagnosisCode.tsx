import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  ElementConfig,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Rule,
} from 'basic/components/Form';
import { formUtils } from 'basic/components/Form';
import { localConfig } from '../../index';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.AdjIIpExpandPayable',
  field: 'diagnosisCode',
  'field-props': {
    visible: 'Y',
    'visible-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: 'claimType' }, operator: '===', right: 'IP' }],
    },
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code-name',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const diagnosisListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities.diagnosisListMap
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

  const visibleConditions = true;
  const requiredConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={diagnosisList}
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

const DiagnosisCode = ({ isShow, layout, form, editable, section, treatmentId }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field="diagnosisCode">
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        treatmentId={treatmentId}
      />
    </ElementConfig.Field>
  </Authority>
);

DiagnosisCode.displayName = 'diagnosisCode';

export default DiagnosisCode;
