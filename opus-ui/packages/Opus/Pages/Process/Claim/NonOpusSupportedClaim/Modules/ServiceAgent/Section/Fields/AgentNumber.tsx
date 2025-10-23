import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemAutoComplete,
  formUtils,
} from 'basic/components/Form';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { AgentStatus } from 'claim/pages/Enum';
import { VLD_000392 } from 'claimBasicProduct/pages/validators';

const localFieldConfig = {
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_003',
  section: 'ServiceAgent',
  field: 'agentNumber',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'agentNo',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const policyAgent = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.policyAgent
  );
  const agentNoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.agentNoList
  );

  const agentStatus = formUtils.queryValue(policyAgent?.agentStatus);
  const isTerminated = agentStatus === AgentStatus.Terminated;
  const agentInactive = VLD_000392(agentStatus);
  const warningMessage = [{ messageType: MessageType.Error, message: agentInactive }];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          dataSource={agentNoList}
          onSearch={() => agentNoList}
          allowClear
          warningMessage={isTerminated && warningMessage}
        />
      </Col>
    )
  );
};

const AgentNumber = ({ field, config, isShow, layout, form, editable }: any) => (
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

AgentNumber.displayName = 'AgentNumber';

export default AgentNumber;
