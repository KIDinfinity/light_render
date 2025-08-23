import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  Rule,
  Required,
} from 'basic/components/Form';
import useGetinsuredRoleByClientId from 'process/NB/ManualUnderwriting/_hooks/useGetinsuredRoleByClientId';
import { fieldConfig } from './MonthlyIncomeRange.config';
import useJudgeIsGBSN from 'basic/components/CaseContainer/hooks/useJudgeIsGBSN';

export { fieldConfig } from './MonthlyIncomeRange.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const insuredRole = useGetinsuredRoleByClientId({ clientId: id });
  const isGBSN = useJudgeIsGBSN();
  const visibleConditions = isGBSN && insuredRole === 'PI';
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = false;
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const MonthlyIncomeRange = ({ form, editable, layout, isShow, config, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
      id={id}
    />
  </Authority>
);

MonthlyIncomeRange.displayName = 'monthlyIncomeRange';

export default MonthlyIncomeRange;
