import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemSelect,
  Required,
} from 'basic/components/Form';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { localConfig as localSectionConfig } from '../index';

const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'OutpatientDateGroup',
  field: 'diagnosisName',
  'field-props': {
    editable: 'Y',
    required: 'Y',
    visible: 'Y',
    label: '',
    'x-layout': {
      // 480px
      xs: {
        span: 22,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 22,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 22,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 22,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 22,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 22,
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
  diagnosisIdList,
  incidentId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const diagnosisListMap = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities.diagnosisListMap
  );

  const incidentDiagnosisIdList =
    useSelector(
      ({ JPCLMOfDataCapture }: any) =>
        JPCLMOfDataCapture.claimEntities.incidentListMap?.[incidentId]?.diagnosisList
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
        dicts={diagnosisList || []}
        existCodes={lodash.filter(diagnosisIdList, (el: any) => !lodash.isEmpty(el))}
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
  form,
  editable,
  section,
  layout,
  isShow,
  diagnosisIdList,
  incidentId,
}: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field="diagnosisName">
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        diagnosisIdList={diagnosisIdList}
        incidentId={incidentId}
      />
    </ElementConfig.Field>
  </Authority>
);

DiagnosisName.displayName = fieldConfig.field;

export default DiagnosisName;
