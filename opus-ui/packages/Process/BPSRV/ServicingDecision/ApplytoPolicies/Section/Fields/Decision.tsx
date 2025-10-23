import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localConfig } from '../index';
import { localFieldConfig } from './Decision.config';
import { NAMESPACE } from '../../../activity.config';

export { localFieldConfig } from './Decision.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  cloneListId,
  transactionId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const policyApplyToPolicyBOList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities.transactionTypesMap[transactionId]?.applyToPolicyBOList
  );
  const isCheck = policyApplyToPolicyBOList?.includes(cloneListId);

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '') || isCheck;

  const Rules = { VLD_000622: Validator.VLD_000622({ isCheck }) };
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !isCheck ||
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          isInline
          view={config.view || fieldProps.view}
        />
      </Col>
    )
  );
};

const Decision = ({ isShow, layout, form, editable, section, cloneListId, transactionId }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        cloneListId={cloneListId}
        transactionId={transactionId}
      />
    </ElementConfig.Field>
  </Authority>
);

Decision.displayName = localFieldConfig.field;

export default Decision;
