import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import CaseCategory from 'enum/CaseCategory';
import { fieldConfig } from './FacType.config';

export { fieldConfig } from './FacType.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const caseCategory =
    useSelector(({ processTask }: any) => processTask.getTask?.caseCategory) || '';

  const dicts = getDrowDownList({ config, fieldProps });

  // 这里为什么不做成配置化?

  const visibleConditions = [CaseCategory.BP_NB_CTG005, CaseCategory.BP_NB_CTG003].includes(
    caseCategory
  );
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
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
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const FacType = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

FacType.displayName = 'facType';

export default FacType;
