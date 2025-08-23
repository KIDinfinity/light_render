import React from 'react';
import lodash from 'lodash';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { localFieldConfig } from './TreatmentType.config';

export { localFieldConfig } from './TreatmentType.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const treatmentListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.treatmentListMap
    ) || {};

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = lodash.isEmpty(treatmentListMap);

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
          placeholder={formatMessageApi({
            Label_BIZ_Claim: 'chooseType',
          })}
          labelType={config.label?.type || fieldProps.label.type}
          choiseHighlight
          placeholderHighlight
          bordered
        />
      </Col>
    )
  );
};

const TreatmentType = ({ field, config, isShow, layout, form, editable }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

TreatmentType.displayName = localFieldConfig.field;

export default TreatmentType;
