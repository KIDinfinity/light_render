import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { Authority, FormItemSelect, Visible } from 'basic/components/Form';
import { fieldConfig } from './Customertype.config';
import useJudgeIsCustomerTypeEditable from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsCustomerTypeEditable'; // 导入可编辑判断钩子
import useGetEditableByRole from 'process/NB/ManualUnderwriting/_hooks/useGetEditableByRole';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';
export { fieldConfig } from './Customertype.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const visibleConditions = true;
  const editableByRole = useGetEditableByRole({
    editableConditions: true,
    config,
    localConfig: fieldConfig,
  });
  const isDisabled: boolean = useJudgeIsCustomerTypeEditable(id); // 钩子读取id检查当前clientInfo的roleList来判断是否禁用
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  const clientDisabled = useJudgeNewClientDisabled({
    config,
    localConfig: {},
    editableConditions: editableByRole && !isDisabled && editable,
  });

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={clientDisabled}
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Customertype = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

Customertype.displayName = 'customerType';

export default Customertype;
