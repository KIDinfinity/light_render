import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';

import {
  Authority,
  Editable,
  FormItemInputV2,
  Visible,
  Rule,
  Validator,
} from 'basic/components/Form';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './SstRegistrationNo.config';

export { fieldConfig } from './SstRegistrationNo.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  const Rules = {
    VLD_001149: Validator.VLD_001149(),
  };

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInputV2
          disabled={
            !editable ||
            ((config?.['field-props']?.visible || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.visible || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          maxLength={17}
          placeholder={'ANN-YYMM-NNNNNNNN'}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules?.[rule])
          )}
          view={readOnly ? 'Y' : 'N'}
        />
      </Col>
    )
  );
};

const SstRegistrationNo = ({
  field,
  form,
  editable,
  layout,
  isShow,
  config,
  id,
  readOnly,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      id={id}
      readOnly={readOnly}
    />
  </Authority>
);

SstRegistrationNo.displayName = 'sstRegistrationNo';

export default SstRegistrationNo;
