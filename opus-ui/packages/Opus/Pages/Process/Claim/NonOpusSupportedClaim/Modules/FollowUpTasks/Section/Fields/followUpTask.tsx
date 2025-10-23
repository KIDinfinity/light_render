import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';

import { getDrowDownList } from '@/utils/dictFormatMessage';

export const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG006.JP_CLM_ACT010',
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_ACT010',
  section: 'FollowUpTask',
  field: 'followUpTask',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: { dictTypeCode: 'Label_COM_OPUS', dictCode: 'followUpTask' },
    'x-dict': {
      dictCode: 'dictCode',
      dictName: 'dictName',
      dictTypeCode: 'Dropdown_CLM_followUpTask',
    },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: { span: 10, offset: 0, pull: 0, order: 2 },
      // 576px
      sm: { span: 10, offset: 0, pull: 0, order: 2 },
      // 768px
      md: { span: 10, offset: 0, pull: 0, order: 2 },
      // 992px
      lg: { span: 10, offset: 0, pull: 0, order: 2 },
      // 1200px
      xl: { span: 10, offset: 0, pull: 0, order: 2 },
      // 1600px
      xxl: { span: 10, offset: 0, pull: 0, order: 2 },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config, index }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  // TODO:配置远程国际化
  const dicts = getDrowDownList({ fieldProps }).sort(
    (a: { dictCode: string }, b: { dictCode: any }) => a.dictCode.localeCompare(b.dictCode)
  );

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
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
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          optionShowType="dictName"
          // isInline={index > 0}
        />
      </Col>
    )
  );
};

const FollowUpTask = ({ field, config, isShow, layout, form, editable, targets, index }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      targets={targets}
      index={index}
    />
  </Authority>
);

FollowUpTask.displayName = localFieldConfig.field;

export default FollowUpTask;
