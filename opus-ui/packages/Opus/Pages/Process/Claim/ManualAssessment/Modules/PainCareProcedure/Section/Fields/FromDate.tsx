import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Visible,
  Rule,
  Required,
  Validator,
  formUtils,
} from 'basic/components/Form';

const localFieldConfig = {
  section: 'PainCareTherapy',
  field: 'fromDate',
  'field-props': {
    dateFormat: 'L',
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'painCareDateOfAdmission',
    },
    required: 'Y',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'treatmentType',
          },
          operator: '===',
          right: 'IP',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': ['fromPainCareDateLaterAdmissionDate'],
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');

  const dateOfAdmission = useSelector(
    ({ opusClaimAssessment }: any) =>
      opusClaimAssessment.claimEntities?.treatmentListMap?.[treatmentId]?.dateOfAdmission
  );

  const admissionDate = formUtils.queryValue(dateOfAdmission);

  const Rules = {
    fromPainCareDateLaterAdmissionDate: Validator.fromPainCareDateLaterAdmissionDate(admissionDate),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
        <FormItemDatePicker
          disabled={(config?.editable || fieldProps.editable) === Editable.No || !editable}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={(config.required || fieldProps.required) === Required.Yes}
          partner="toDate"
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const FromDate = ({ field, config, form, editable, layout, isShow, treatmentId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
    />
  </Authority>
);

FromDate.displayName = 'FromDate';

export default FromDate;
