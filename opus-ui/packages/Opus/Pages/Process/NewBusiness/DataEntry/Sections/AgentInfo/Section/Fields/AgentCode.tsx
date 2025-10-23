import React, { useState } from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  formUtils,
  RuleByForm,
} from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();

  const [enterDown, setEnterDown] = useState(false);

  const handleAgentCode = (value?: string) => {
    dispatch({
      type: `${NAMESPACE}/saveSearchAgentCode`,
      payload: {
        agentCode: value ?? formUtils.queryValue(form.getFieldValue(field)),
        field,
      },
    });
  };

  const handleOnBlur = () => {
    if (!enterDown) {
      handleAgentCode();
    }
  };

  const handleOnFocus = () => {
    setEnterDown(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setEnterDown(true);
      handleAgentCode(e.target.value);
    }
  };

  const fieldProps: any = config;

  const visibleConditions = RuleByForm(
    config['visible-condition'] || fieldProps['visible-condition'],
    form
  );
  const editableConditions = !RuleByForm(
    config['editable-condition'] || fieldProps['editable-condition'],
    form
  );
  const requiredConditions = RuleByForm(
    config['required-condition'] || fieldProps['required-condition'],
    form
  );

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
          maxLength={config?.maxLength}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onKeyDown={handleKeyDown}
        />
      </Col>
    )
  );
};
const field = 'agentCode';

const AgentCode = ({ config, form, editable, layout, isShow }: any) => (
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

AgentCode.displayName = field;

export default AgentCode;
