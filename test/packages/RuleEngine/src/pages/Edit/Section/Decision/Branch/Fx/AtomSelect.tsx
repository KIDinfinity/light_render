import React from 'react';
import {useSelector } from 'dva';
import { Form, Input } from 'antd';
import lodash from 'lodash';
import { FormItemSelect } from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (props: any) => {
  const { disabled, formulaAtom = '', ...restProps } = props;

  const ruleSetInfo = useSelector((state: any) => state.ruleEngineController.submitRuleSet.ruleSetInfo);
  const moduleCode = formUtils.queryValue(ruleSetInfo?.moduleCode);
  const ruleAtoms = useSelector((state: any) => state.ruleEngineController.dropDown.ruleAtoms);

  const ruleAtom = lodash
    .chain(ruleAtoms)
    .filter((el: any) => el?.moduleCode === moduleCode)
    .value();

  if (formulaAtom) {
    return (
      <Form.Item label={formatMessageApi({ Label_BIZ_Claim: restProps.labelId })}>
        <Input disabled value={formulaAtom} />
      </Form.Item>
    );
  }
  return <FormItemSelect dicts={ruleAtom} {...restProps} disabled={disabled} />;
};
