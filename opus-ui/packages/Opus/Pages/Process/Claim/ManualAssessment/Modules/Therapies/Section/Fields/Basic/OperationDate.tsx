import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemDatePicker,
  formUtils,
  Validator,
} from 'basic/components/Form';
import { useGetInputLimitDate } from 'process/HKCLM/_hooks';
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Procedure',
  field: 'operationDate',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-operation',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-rules': ['operationDateLaterIncidentDate', 'operationDateEarlierDeathDate'],
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const incidentDate = formUtils.queryValue(
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace.claimEntities?.incidentListMap?.[incidentId]?.incidentDate
    )
  );
  const dateTimeOfDeath = formUtils.queryValue(
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace.claimProcessData?.insured?.dateTimeOfDeath
    )
  );

  const Rules = {
    operationDateLaterIncidentDate: {
      validator: Validator.operationDateLaterIncidentDate(incidentDate),
    },
    operationDateEarlierDeathDate: {
      validator: Validator.operationDateEarlierDeathDate(dateTimeOfDeath),
    },
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules']).map((rule: any) => Rules[rule])
          )}
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const OperationDate = ({ field, config, isShow, layout, form, editable, incidentId }: any) => (
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

OperationDate.displayName = 'OperationDate';

export default OperationDate;
