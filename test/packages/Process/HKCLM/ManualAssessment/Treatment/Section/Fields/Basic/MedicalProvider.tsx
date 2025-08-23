import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  formUtils,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { ClaimType } from 'claim/enum';
import { localFieldConfig } from './MedicalProvider.config';

export { localFieldConfig } from './MedicalProvider.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const { id: treatmentId, incidentId }: any = form.getFieldsValue(['id', 'incidentId']);

  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]
  );
  const claimTypeArray = formUtils.queryValue(lodash.get(incidentItem, 'claimTypeArray'));
  const isInclude =
    lodash.includes(claimTypeArray, ClaimType.IPD) ||
    lodash.includes(claimTypeArray, ClaimType.OPD);

  const dispatch = useDispatch();
  const onSelect = (value: any, typeCode: any) => {
    dispatch({
      type: `${NAMESPACE}/getProviderPlaceByMedicalCode`,
      payload: {
        medicalProviderCode: value,
        treatmentId,
        hospitalType: typeCode,
      },
    });
  };
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = Rule(fieldProps['required-condition'], form, NAMESPACE) || isInclude;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
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
          onSelectCallback={onSelect}
          searchName="medicalProvider"
          dropdownCode="claim_dict005"
          optionShowType="both"
          otherParams={{ provinceCode: 'CNEXCLUDE' }}
        />
      </Col>
    )
  );
};

const MedicalProvider = ({ field, config, isShow, layout, form, editable }: any) => (
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

MedicalProvider.displayName = localFieldConfig.field;

export default MedicalProvider;
