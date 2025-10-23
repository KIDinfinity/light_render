import React, { useEffect } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Validator,
} from 'basic/components/Form';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident.Basic',
  field: 'causeOfIncident',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.case-of-incident',
    },
    'x-dict': { dictTypeCode: 'CauseOfIncident' },
    'x-rules': ['VLD_000765'],
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  }
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  diagnosisListId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode)

  const diagnosis = useSelector(
    ({ opusClaimAssessment }: any) => opusClaimAssessment?.claimEntities.diagnosisListMap
  );
  const temp = lodash
    .chain(diagnosisListId)
    .map((id) => diagnosis[id]?.diagnosisCode)
    .join('-')
    .value();
  const Rules = {
    VLD_000765: Validator.VLD_000765({ diagnosis, diagnosisListId }),
  };
  const causeOfIncident = form.getFieldValue('causeOfIncident');

  useEffect(() => {
    !!causeOfIncident && form.validateFields([localFieldConfig.field], { force: true });
  }, [temp]);

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
          rules={fieldProps['x-rules']?.map((rule: string) => Rules[rule])}
        />
      </Col>
    )
  );
};

const CauseOfIncident = ({ field, config, isShow, layout, form, editable, diagnosisList }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      diagnosisListId={diagnosisList}
    />
  </Authority>
);

CauseOfIncident.displayName = 'CauseOfIncident';

export default CauseOfIncident;
