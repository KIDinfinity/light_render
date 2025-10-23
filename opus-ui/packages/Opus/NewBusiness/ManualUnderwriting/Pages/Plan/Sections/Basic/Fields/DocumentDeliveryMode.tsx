import React from 'react';
import { useSelector } from 'dva';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
import CaseCategory from 'enum/CaseCategory';
import { fieldConfig } from './DocumentDeliveryMode.config';

export { fieldConfig } from './DocumentDeliveryMode.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const { caseCategory, taskDefKey } =
    useSelector(({ processTask }: any) => processTask.getTask?.caseCategory) || {};

  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = !(
    caseCategory === CaseCategory.BP_NB_CTG003 && taskDefKey === TaskDefKey.BP_NB_ACT008
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

const DocumentDeliveryMode = ({ field, config, form, editable, layout, isShow }: any) => (
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

DocumentDeliveryMode.displayName = 'eDocument';

export default DocumentDeliveryMode;
