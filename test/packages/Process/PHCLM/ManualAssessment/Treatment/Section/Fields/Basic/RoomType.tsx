import React, { useEffect, useState, useMemo } from 'react';
import lodash from 'lodash';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Rule,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './RoomType.config';

export { localFieldConfig } from './RoomType.config';
import { ClaimType } from 'claim/enum';
import { ClaimTypeArray } from 'basic/enum';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  treatmentId,
  incidentId,
}: any) => {
  const dispatch = useDispatch();
  const [isFirst, setIsFirst] = useState(true);
  const fieldProps: any = localFieldConfig['field-props'];

  const hospitalType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId].hospitalType
  );

  const dicts = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.roomTypeDict);

  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]
  );
  const claimTypeArray = formUtils.queryValue(lodash.get(incidentItem, 'claimTypeArray'));
  const treatmentType = formUtils.queryValue(
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.treatmentType
    )
  );
  const medicalProvider = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
    modelnamepsace.claimEntities.treatmentListMap[treatmentId].medicalProvider
  )
  const isInclude = lodash.includes(claimTypeArray, ClaimType.IPD);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getRoomTypeDict`,
      payload: {
        hospitalType: formUtils.queryValue(hospitalType),
        treatmentId,
        isFirst,
      },
    });
    if (isFirst) {
      setIsFirst(false);
    }
  }, [formUtils.queryValue(hospitalType)]);

  useEffect(() => {
    if (
      lodash.size(lodash.intersection(claimTypeArray, [ClaimTypeArray.PA, ClaimTypeArray.Crisis])) >
      0 &&
      treatmentType === 'OP'
    ) {
      dispatch({
        type: `${NAMESPACE}/saveEntry`,
        target: 'saveTreatmentItem',
        payload: {
          changedFields: { [localFieldConfig.field]: 'OU' },
          incidentId,
          treatmentId,
        },
      });
    }
  }, [claimTypeArray, treatmentType]);

  const filterList = useMemo(() => {
    if (formUtils.queryValue(medicalProvider) === '998') {
      return ['AS', 'P', 'S', 'W', 'GW']
    }
    return []
  }, [formUtils.queryValue(medicalProvider)]);

  const visibleConditions = true;
  const editableConditions = !lodash.isEmpty(formUtils.queryValue(hospitalType));
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
          filterList={filterList}
        />
      </Col>
    )
  );
};

const RoomType = ({ field, config, isShow, layout, form, editable, treatmentId, incidentId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      incidentId={incidentId}
    />
  </Authority>
);

RoomType.displayName = localFieldConfig.field;

export default RoomType;
