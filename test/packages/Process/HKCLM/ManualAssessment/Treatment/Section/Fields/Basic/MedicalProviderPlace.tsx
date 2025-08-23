import React from 'react';
import { NAMESPACE } from '../../../../activity.config';
import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { ClaimType } from 'claim/enum';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  formUtils,
  Rule,
  Visible,
} from 'basic/components/Form';
import { localFieldConfig } from './MedicalProviderPlace.config';

export { localFieldConfig } from './MedicalProviderPlace.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const { incidentId }: any = form.getFieldsValue(['incidentId']);

  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]
  );
  const claimTypeArray = formUtils.queryValue(lodash.get(incidentItem, 'claimTypeArray'));
  const isInclude =
    lodash.includes(claimTypeArray, ClaimType.IPD) ||
    lodash.includes(claimTypeArray, ClaimType.OPD);

  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = Rule(fieldProps['required-condition'], form, NAMESPACE) || isInclude;

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
        />
      </Col>
    )
  );
};

const MedicalProviderPlace = ({ field, config, isShow, layout, form, editable }: any) => (
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

MedicalProviderPlace.displayName = localFieldConfig.field;

export default MedicalProviderPlace;
