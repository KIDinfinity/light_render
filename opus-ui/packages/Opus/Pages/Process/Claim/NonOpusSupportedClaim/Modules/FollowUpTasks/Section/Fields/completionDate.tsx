import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { Authority, Editable, FormItemDatePicker, Required, Visible } from 'basic/components/Form';

export const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG006.JP_CLM_ACT010',
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_ACT010',
  section: 'FollowUpTask',
  field: 'taskCompletionDate',
  'field-props': {
    label: {
      dictTypeCode: 'Label_COM_OPUS',
      dictCode: 'CompletionDate',
    },
    visible: 'Y',
    required: 'Y',
    editable: 'Y',
    'x-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config, index }: any) => {
  const { activityKey } = useSelector((state: any) => ({
    activityKey: state?.opusNonOpusClaimManagement?.taskDetail?.activityKey,
  }));
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const requireConditions = activityKey === 'JP_CLM_ACT012';

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          placeholder={''}
          form={form}
          required={
            config?.required === Required.Conditions
              ? requireConditions
              : config?.required === Required.Yes
          }
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? requireConditions
              : config?.editable === Editable.No)
          }
          labelId={index === 0 ? config.label?.dictCode || fieldProps.label.dictCode : ' '}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          formName={field || fieldProps.field}
          allowFreeSelect={true}
        />
      </Col>
    )
  );
};

const CompletionDate = ({ field, config, form, editable, insured, layout, isShow, index }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      insured={insured}
      index={index}
    />
  </Authority>
);

CompletionDate.displayName = 'taskCompletionDate';

export default CompletionDate;
