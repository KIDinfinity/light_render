import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import { filter } from 'lodash';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { localFieldConfig } from './ClaimTypeArray.config';

export { localFieldConfig } from './ClaimTypeArray.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const dictsOfClaimType = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config?.['field-props']?.['x-dict']?.dictTypeCode || fieldProps['x-dict'].dictTypeCode
      ]
  );
  const dictsOfClaimTypes = filter(dictsOfClaimType, (value: any) => value.dictCode !== 'DTH');

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          mode="multiple"
          labelType="inline"
          choiseHighlight
          placeholderHighlight
          placeholder={formatMessageApi({
            Label_BIZ_Claim: 'chooseType',
          })}
          bordered
        />
      </Col>
    )
  );
};

const ClaimTypeArray = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

ClaimTypeArray.displayName = localFieldConfig.field;

export default ClaimTypeArray;
