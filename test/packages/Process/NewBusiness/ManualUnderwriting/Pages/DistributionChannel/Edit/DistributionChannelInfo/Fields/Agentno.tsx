import React, { useCallback } from 'react';
import { Col } from 'antd';
import { FormItemInput, formUtils, Validator } from 'basic/components/Form';

import useGetFieldConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
import { fieldConfig } from '../../../_config/DistributionChannelField/Agentno.config';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

interface IFiledProps {
  isShow?: boolean;
  editable?: boolean;
  field?: any;
  layout?: any;
  form?: any;
  config?: any;
}

const Agentno = ({ isShow, layout, form, editable, field, config }: IFiledProps) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isLast = form.getFieldValue('isLast');
  const dispatch = useDispatch();

  const Rules = {
    checkMWAgentCode: Validator.checkMWAgentCode({
      uwProposalAgent: form.getFieldValue('validAgentNo'),
    }),
  };
  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    Rules,
  };
  const {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    label,
    name,
    calculatedRules,
  } = useGetFieldConfig(propsConfig, config, fieldProps);

  const handleBlur = useCallback(async () => {
    const id = formUtils.queryValue(form.getFieldValue('id'));
    const agentNo = formUtils.queryValue(form.getFieldValue('agentNo'));
    const agentType = formUtils.queryValue(form.getFieldValue('agentType'));

    if (!id || !agentNo) return;

    await dispatch({
      type: `${NAMESPACE}/pullAgentInfoById`,
      payload: { id },
    });
    await dispatch({
      type: `${NAMESPACE}/updateBankStaffList`,
      payload: {
        agentList: [
          {
            agentNo,
            agentType,
          },
        ],
      },
    });
    form.validateFields([name], {
      force: true,
    });
  }, [dispatch, form, name]);

  return isShow && calculatedVisible ? (
    <Col {...layout}>
      <FormItemInput
        onBlur={() => handleBlur()}
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

Agentno.displayName = 'agentNo';

export default Agentno;
