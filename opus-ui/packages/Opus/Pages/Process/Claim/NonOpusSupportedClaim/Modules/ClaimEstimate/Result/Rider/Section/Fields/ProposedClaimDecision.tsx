import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { localFieldConfig } from './ProposedClaimDecision.config';

export { localFieldConfig } from './ProposedClaimDecision.config';
const FormItem = ({ isShow, layout, form, editable, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = getDrowDownList('Dropdown_CLM_ClaimEstimateDecision');

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || localFieldConfig.field}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const ProposedClaimDecision = ({ config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

ProposedClaimDecision.displayName = localFieldConfig.field;

export default ProposedClaimDecision;
