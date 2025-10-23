import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';

import { localConfig } from '../index';
import { fieldConfig } from './Rpqscore.config';

export { fieldConfig } from './Rpqscore.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
          formatter={() => {}}
        />
      </Col>
    )
  );
};

const Rpqscore = ({ isShow, layout, form, editable, section }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={fieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

Rpqscore.displayName = 'rpqScore';

export default Rpqscore;
