import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemInput, Rule } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG006.JP_CLM_ACT010',
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_ACT010',
  section: 'FollowUpTask',
  field: 'itemNo',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_COM_OPUS',
      dictCode: 'itemNo',
    },
    maxLength: 3,
    'x-layout': {
      // 480px
      xs: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 2,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config, index }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(
    fieldProps['editable-condition'],
    form,
    'opusNonOpusClaimManagement'
  );
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={index === 0 ? config.label?.dictCode || fieldProps.label.dictCode : ' '}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const ItemNo = ({ field, config, isShow, layout, form, editable, index }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      index={index}
    />
  </Authority>
);

ItemNo.displayName = 'ItemNo';

export default ItemNo;
