import React from 'react';
import { Col } from 'antd';
import { Authority, FormItemInput } from 'basic/components/Form';
import { fieldConfig } from './Agentgroup.config';
import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

export { fieldConfig } from './Agentgroup.config';

const FormItem = ({ isShow, layout, form, editable, field, config, isLast }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    Rules: {},
  };
  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    label,
    name,
    calculatedRules,
  } = useGetFieldConfig(propsConfig, config, fieldProps);
  return isShow && calculatedVisible ? (
    <Col {...layout}>
      <FormItemInput
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={!isLast && calculatedRequired}
        placeholder=" "
        rules={isLast ? [] : calculatedRules}
      />
    </Col>
  ) : null;
};

const Agentgroup = ({ field, config, form, editable, layout, isShow }: any) => (
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

Agentgroup.displayName = 'agentGroup';

export default Agentgroup;
