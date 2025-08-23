import React from 'react';
import { Col } from 'antd';
import {
  Editable,
  Required,
  Visible,
  Rule,
  FormItemSelect,
} from 'basic/components/Form';
import { localFieldConfig } from './Decision.config';

export { localFieldConfig } from './Decision.config';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { BenefitLevelDecisionEnum } from 'process/GeneralPOS/common/Enum';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  sclale,
  newCoverage,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dictList = [
    BenefitLevelDecisionEnum.Standard,
    BenefitLevelDecisionEnum.Postpone,
    BenefitLevelDecisionEnum.Decline,
    BenefitLevelDecisionEnum.NonStandard,
  ];

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const filterDicts = lodash
    .chain(dicts)
    .filter((item: any) => {
      return dictList.includes(item?.dictCode);
    })
    .value();
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col
        {...layout}
        style={{
          width: `calc((1443px * ${sclale || 0.96} - 32px) / 24 * ${
            config?.['x-layout']?.lg?.span || fieldProps?.['x-layout']?.lg?.span
          })`,
          padding: 8,
        }}
      >
        <FormItemSelect
          getPopupContainer={() => document.querySelector('.AddNewRiders') || document.body}
          dicts={filterDicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          isInline
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
