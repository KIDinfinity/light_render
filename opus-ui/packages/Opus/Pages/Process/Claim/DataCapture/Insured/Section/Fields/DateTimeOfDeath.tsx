import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { formUtils } from 'basic/components/Form';
import { Authority, Editable, FormItemDatePicker, Required, Visible } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Insured',
  field: 'dateTimeOfDeath',
  'field-props': {
    dateFormat: 'L LTS',
    editable: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.datetime-of-death',
    },
    required: 'C',
    visible: 'Y',
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
    useSelector(({ opusClaimDataCapture }: any) => opusClaimDataCapture.claimEntities?.incidentListMap)
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
          format={localFieldConfig['field-props'].dateFormat}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          maxLength={config?.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          showTime
        />
      </Col>
    )
  );
};

const DateTimeOfDeath = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

DateTimeOfDeath.displayName = 'DateTimeOfDeath';

export default DateTimeOfDeath;
