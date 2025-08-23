import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';

import { localFieldConfig } from './TherapiesTypeIAdd.config';

export { localFieldConfig } from './TherapiesTypeIAdd.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isAdd,
  treatmentId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]
  );
  const isExistICU = treatmentList?.therapiesType === TherapiesTypeEnum.ICU || treatmentList?.icu;
  const existICU = isExistICU ? [TherapiesTypeEnum.ICU] : [];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = !isAdd;

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
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          existCodes={existICU}
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const TherapiesTypeAdd = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  isAdd,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      isAdd={isAdd}
    />
  </Authority>
);

TherapiesTypeAdd.displayName = localFieldConfig.field;

export default TherapiesTypeAdd;
