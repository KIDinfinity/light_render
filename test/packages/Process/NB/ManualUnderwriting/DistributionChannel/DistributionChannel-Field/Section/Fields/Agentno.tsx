import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import {
  Authority,
  FormItemInput,
  Required,
  Visible,
  formUtils,
  Validator,
  RuleByForm,
  Editable,
} from 'basic/components/Form';
import useAgentNoBlurCallback from 'process/NB/ManualUnderwriting/_hooks/useAgentNoBlurCallback';
import { fieldConfig } from './Agentno.config';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export { fieldConfig } from './Agentno.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;
  const uwProposalAgent = useSelector(
    (state: any) => state?.[NAMESPACE]?.uwProposalAgent,
    shallowEqual
  );
  const handleBlur = useAgentNoBlurCallback({
    agentType: formUtils.queryValue(form.getFieldValue('agentType')),
    id: formUtils.queryValue(form.getFieldValue('id')),
    form,
  });
  const Rules = {
    checkMWAgentCode: Validator.checkMWAgentCode({ uwProposalAgent }),
  };

  // useEffect(() => {
  //   form.validateFields([field], {
  //     force: true,
  //   });
  // }, [uwProposalAgent]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          onBlur={(e: any) => handleBlur(e.target?.value)}
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Agentno = ({ field, config, form, editable, layout, isShow }: any) => (
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

Agentno.displayName = 'agentNo';

export default Agentno;
