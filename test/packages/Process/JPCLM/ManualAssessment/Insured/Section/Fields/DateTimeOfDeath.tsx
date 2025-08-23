import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemDatePicker,
} from 'basic/components/Form';
import { formUtils } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Insured',
  field: 'dateTimeOfDeath',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    // 'editable-condition': {
    //   combine: '||',
    //   conditions: [
    //     { left: { domain: 'ACTIVITY', field: 'claimTypeArray' }, operator: '===', right: 'R' },
    //   ],
    // },
    dateFormat: 'L LTS',
    required: 'C',
    // 'required-condition': {
    //   combine: '||',
    //   conditions: [
    //     { left: { domain: 'ACTIVITY', field: 'claimTypeArray' }, operator: '===', right: 'R' },
    //   ],
    // },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.datetime-of-death',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const incidentListMap = formUtils.queryValue(
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment.claimEntities?.incidentListMap
    )
  );

  const claimTypeList = !lodash.isEmpty(incidentListMap)
    ? lodash.reduce(
      incidentListMap,
      (arr: any, item: any) => {
        return item?.claimTypeArray && formUtils.queryValue(item?.claimTypeArray)
          ? [...arr, ...formUtils.queryValue(item?.claimTypeArray)]
          : arr;
      },
      []
    )
    : [];
  const visibleConditions = true;
  const editableConditions = lodash.includes(claimTypeList, 'DTH');
  const requiredConditions = lodash.includes(claimTypeList, 'DTH');

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
          format={config.dateFormat || fieldProps.dateFormat}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          showTime
        />
      </Col>
    )
  );
};

const DateTimeOfDeath = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

DateTimeOfDeath.displayName = 'DateTimeOfDeath';

export default DateTimeOfDeath;
