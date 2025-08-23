import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

import useJudgeContactTypeDisabled from '../_hooks/useJudgeContactTypeDisabled';
import useGetContacttypeDicts from '../_hooks/useGetContacttypeDicts';
import { fieldConfig } from './ContacttypeAdd.config';
export { fieldConfig } from './ContacttypeAdd.config';


const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  contactId,
  id,
  contactSeqNum,
  readOnly
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetContacttypeDicts({ config, fieldConfig, contactSeqNum, id, readOnly });
  const disabled = useJudgeContactTypeDisabled({ id, contactId, readOnly });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
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
            disabled ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          isInline
        />
      </Col>
    )
  );
};

const Contacttype = ({
  form,
  editable,
  layout,
  isShow,
  id,
  config,
  contactItemId,
  contactSeqNum,
  handleChange,
  isLast,
  readOnly,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        contactId={contactItemId}
        contactSeqNum={contactSeqNum}
        handleChange={handleChange}
        isLast={isLast}
        readOnly={readOnly}
      />
    </Authority>
  );
};

Contacttype.displayName = 'contactType';

export default Contacttype;
