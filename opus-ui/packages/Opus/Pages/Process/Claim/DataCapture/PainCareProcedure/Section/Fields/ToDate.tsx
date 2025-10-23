import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Validator,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';

const localFieldConfig = {
  section: 'PainCareTherapy',
  field: 'toDate',
  'field-props': {
    dateFormat: 'L',
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'painCareDateOfDischarge',
    },
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
    required: 'C',
    'required-condition': {
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
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': ['VLD_000095', 'toPainCareDateEarlierDischargeDate'],
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const fromDateValue = form.getFieldValue('fromDate');

  const dateOfDischarge = useSelector(
    ({ opusClaimDataCapture }: any) =>
      opusClaimDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.dateOfDischarge
  );

  const Rules = {
    VLD_000095: {
      validator: Validator.VLD_000095_dumplicate_3(fromDateValue),
    },
    toPainCareDateEarlierDischargeDate: Validator.toPainCareDateEarlierDischargeDate(
      formUtils.queryValue(dateOfDischarge)
    ),
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
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules']).map((rule: any) => Rules[rule])
          )}
          partner="fromDate"
        />
      </Col>
    )
  );
};

const ToDate = ({ field, config, form, editable, layout, isShow, treatmentId }: any) => (
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

ToDate.displayName = localFieldConfig.field;

export default ToDate;
