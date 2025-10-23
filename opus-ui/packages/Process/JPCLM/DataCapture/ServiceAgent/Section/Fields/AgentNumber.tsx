import React from 'react';
import { useSelector } from 'dva';

import { Col } from 'antd';
import { Authority, Editable, FormItemAutoComplete, formUtils } from 'basic/components/Form';
import { VLD_000392 } from 'claimBasicProduct/pages/validators';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { AgentStatus } from 'claim/pages/Enum';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'agent',
  field: 'agentNumber',
  'field-props': {
    editable: 'Y',
    label: {
      dictCode: 'AgentNo',
    },
    required: false,
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
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
  const agentNoList = useSelector((state: any) => state.JPCLMOfDataCapture.agentNoList);
  const policyAgent = useSelector(
    (state: any) => state.JPCLMOfDataCapture.claimProcessData?.policyAgent
  );
  const agentStatus = formUtils.queryValue(policyAgent?.agentStatus);
  const isTerminated = agentStatus === AgentStatus.Terminated;
  const agentInactive = VLD_000392(agentStatus);
  const warningMessage = [{ messageType: MessageType.Error, message: agentInactive }];
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemAutoComplete
        disabled={config.editable === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        dataSource={agentNoList}
        onSearch={() => agentNoList}
        allowClear
        warningMessage={isTerminated && warningMessage}
        required={config.required || localFieldConfig['field-props'].required}
      />
    </Col>
  );
};

const AgentNumber = ({ field, config, form, editable, layout, isShow }: any) => (
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
