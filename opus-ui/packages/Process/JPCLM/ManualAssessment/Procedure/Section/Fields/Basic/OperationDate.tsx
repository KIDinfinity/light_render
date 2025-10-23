import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
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
  section: 'Procedure.Basic',
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
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 12,
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
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId]?.incidentDate
    )
  );
  const dateTimeOfDeath = formUtils.queryValue(
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment.claimProcessData?.insured?.dateTimeOfDeath
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
