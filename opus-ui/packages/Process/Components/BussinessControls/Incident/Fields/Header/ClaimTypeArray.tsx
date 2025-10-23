import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { filter } from 'lodash';
import { ConfigHeaderClaimTypeArray } from '../_hooks';
import { useSelector } from 'dva';
import { localFieldConfig } from './ClaimTypeArray.config';

export { localFieldConfig } from './ClaimTypeArray.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE, id }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const dictsOfClaimType = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config?.['field-props']?.['x-dict']?.dictTypeCode || fieldProps['x-dict']?.dictTypeCode
      ]
  );
  const dictsOfClaimTypes = filter(dictsOfClaimType, (value: any) => value.dictCode !== 'DTH');

  const { extraConfig } = ConfigHeaderClaimTypeArray({ NAMESPACE, incidentId: id });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dictsOfClaimTypes} // TODO: 动态下拉
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
          bordered
          allowClear
          labelType={config.label?.type || fieldProps.label.type}
          hideRequired
          choiseHighlight
          {...extraConfig}
        />
      </Col>
    )
  );
};

const ClaimTypeArray = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  NAMESPACE,
  id,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      id={id}
    />
  </Authority>
);

ClaimTypeArray.displayName = localFieldConfig.field;

export default ClaimTypeArray;
