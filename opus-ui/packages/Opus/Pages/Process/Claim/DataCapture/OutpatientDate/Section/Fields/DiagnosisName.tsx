import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
} from 'basic/components/Form';
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
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { fieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const diagnosisListMap = useSelector(
    ({ opusClaimDataCapture }: any) => opusClaimDataCapture.claimEntities.diagnosisListMap
  );

  const incidentDiagnosisIdList =
    useSelector(
      ({ opusClaimDataCapture }: any) =>
        opusClaimDataCapture.claimEntities.incidentListMap?.[incidentId]?.diagnosisList
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

const DiagnosisName = ({ field, config, form, editable, layout, isShow, incidentId }: any) => (
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

DiagnosisName.displayName = fieldConfig.field;

export default DiagnosisName;
