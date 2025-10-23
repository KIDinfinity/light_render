import React from 'react';
import { Col, Input } from 'antd';
import { useSelector, useDispatch } from 'dva';

import { AgentStatus } from 'claim/pages/Enum';
import { VLD_000392 } from 'claimBasicProduct/pages/validators';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import {
  Authority,
  Editable,
  FormItemAutoComplete,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import styles from './AgentNumber.less';
import { localFieldConfig } from './AgentNumber.config';

export { localFieldConfig } from './AgentNumber.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const policyAgent = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.policyAgent
  );
  const agentNoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.agentNoList
  );
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const refreshAgent = () => {
    if (taskNotEditable) return;
    dispatch({
      type: `${NAMESPACE}/agentRefresh`,
    });
  };
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const agentStatus = formUtils.queryValue(policyAgent?.agentStatus);
  const isTerminated = agentStatus === AgentStatus.Terminated;
  const agentInactive = VLD_000392(agentStatus);
  const warningMessage = [{ messageType: MessageType.Error, message: agentInactive }];

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemAutoComplete
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          dataSource={agentNoList}
          onSearch={() => agentNoList}
          allowClear
          reload={refreshAgent}
          warningMessage={isTerminated && warningMessage}
          refreshStyle
          className={styles.agentNumberDisable}
        >
          <Input maxLength={config?.maxLength || fieldProps.maxLength} />
        </FormItemAutoComplete>
      </Col>
    )
  );
};

const AgentNumber = ({ field, config, isShow, layout, form, editable, id, NAMESPACE }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

AgentNumber.displayName = localFieldConfig.field;

export default AgentNumber;
